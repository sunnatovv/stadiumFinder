import { Module } from '@nestjs/common';
import { StadiumTimesService } from './stadium_times.service';
import { StadiumTimesController } from './stadium_times.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StadiumTimes } from './model/stadium_time.model';

@Module({
  imports: [SequelizeModule.forFeature([StadiumTimes])],
  controllers: [StadiumTimesController],
  providers: [StadiumTimesService],
})
export class StadiumTimesModule {}
