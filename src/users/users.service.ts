import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_REFRESH_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_REFRESH_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accesToken,
      refresh_token: refreshToken,
    };
  }

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
      { where: { id: newUser.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
