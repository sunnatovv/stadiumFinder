import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Admin } from './models/admin.model';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UserGuard } from '../guards/user.guard';
import { SelfGuard } from '../guards/self.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register a new user' }) // Description for Swagger documentation
  @ApiResponse({ status: 201, type: Admin }) // Response definition for Swagger documentation
  @Post('signup') // Defines HTTP POST method and endpoint route
  async registration(
    @Body() createAdminDto: CreateAdminDto, // Request body containing user data
    @Res({ passthrough: true }) res: Response, // Express Response object for setting cookies
  ) {
    return this.adminService.registration(createAdminDto, res); // Calls the registration method from the service
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
  // @Get('activate/:link')
  // async activate(@Param('link') link: string) {
  //   return this.adminService.activate(link);
  // }
}
