import { Module } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stadiums } from './model/stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Stadiums])],
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
