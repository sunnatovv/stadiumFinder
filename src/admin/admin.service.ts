import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
// import { Admin } from './model/admin.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Admin } from './models/admin.model';
import { LoginAdminDto } from './dto/login-admin.dto';
// import { LoginAdminDto } from './dto/login_admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService, // Injecting the JwtService for token generation
  ) {}

  // Method to generate access and refresh tokens for a given admin
  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      isActive: admin.isActive,
      isOwner: admin.isCreator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      // Signing access token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      // Signing refresh token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Method to register a new admin
  async registration(createAdminDto: CreateAdminDto, res: Response) {
    // Check if admin with the same login already exists
    const admin = await this.adminRepo.findOne({
      where: { login: createAdminDto.login },
    });
    if (admin) {
      throw new BadRequestException('This admin already exists');
    }
    // Check if password and confirm password match
    if (createAdminDto.password !== createAdminDto.confirmPassword) {
      throw new BadRequestException('Password does not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    // Create a new admin with hashed password
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashedPassword,
    });

    // Generate tokens for the new admin
    const tokens = await this.getTokens(newAdmin);

    // Hash the refresh token and generate activation link
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    const activationLink = v4();

    // Update the admin with hashed refresh token and activation link
    const updatedadmin = await this.adminRepo.update(
      { hashedRefreshToken, activationLink },
      { where: { id: newAdmin.id }, returning: true },
    );

    // Set refresh token as a cookie in the response
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    // Prepare response object
    const response = {
      message: 'Admin registered',
      admin: updatedadmin[1][0],
      tokens,
    };

    return response; // Return the response object
  }

  // async activate(link: string) {
  //    if (!link) {
  //     throw new BadRequestException('Activation link not found');
  //   }
  //   const updatAdmin = await this.adminRepo.update(
  //     { isActive: true },
  //     {
  //       where: { activationLink: link, isActive: false },
  //       returning: true,
  //     },
  //   );
  //   if (!updatAdmin[1][0]) {
  //     throw new BadRequestException('admin already activated');
  //   }
  //   const response = {
  //     message: 'admin activated successfully',
  //     admin: updatAdmin[1][0].isActive,
  //   };
  //   return response;
  // }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { login, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { login } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    // if (!admin.isActive) {
    //   throw new BadRequestException('admin not activated');
    // }
    const isMatchPass = await bcrypt.compare(password, admin.hashedPassword);

    if (!isMatchPass) {
      throw new BadRequestException('Password is not match');
    }

    const tokens = await this.getTokens(admin);

    // Hash the refresh token and generate activation link
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);

    // Update the admin with hashed refresh token and activation link
    const updatedadmin = await this.adminRepo.update(
      { hashedRefreshToken },
      { where: { id: admin.id }, returning: true },
    );

    // Set refresh token as a cookie in the response
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    // Prepare response object
    const response = {
      message: 'admin registered',
      admin: updatedadmin[1][0],
      tokens,
    };

    return response; // Return the response object
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException('Admin not verified');
    }

    const updateAdmin = await this.adminRepo.update(
      {
        hashedPassword: null,
      },
      {
        where: { id: userData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const reponse = {
      message: 'admin logged out successfully',
      user_refresh_token: updateAdmin[1][0].hashedRefreshToken,
    };
    return reponse;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    console.log(refreshToken);

    const decodecToken = await this.jwtService.decode(refreshToken);
    if (userId != decodecToken['id']) {
      throw new BadRequestException('admin not found');
    }
    const admin = await this.adminRepo.findOne({ where: { id: userId } });

    if (!admin || !admin.hashedRefreshToken) {
      throw new BadRequestException('admin not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashedRefreshToken,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbiddin');
    }

    const tokens = await this.getTokens(admin);

    // Hash the refresh token and generate activation link
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);

    // Update the admin with hashed refresh token and activation link
    const updatedUser = await this.adminRepo.update(
      { hashedRefreshToken },
      { where: { id: admin.id }, returning: true },
    );

    // Set refresh token as a cookie in the response
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    // Prepare response object
    const response = {
      message: 'admin refreshed',
      admin: updatedUser[1][0],
      tokens,
    };

    return response;
  }

  async create(createAdminDto: CreateAdminDto) {
    return this.adminRepo.create(createAdminDto);
  }

  async findAll() {
    return this.adminRepo.findAll();
  }

  async findOne(id: number) {
    return this.adminRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  async remove(id: number) {
    const adminRows = await this.adminRepo.destroy({ where: { id } });
    if (adminRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
