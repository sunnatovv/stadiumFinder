import { Module } from '@nestjs/common';
import { ConfortStadiumService } from './confort_stadium.service';
import { ConfortStadiumController } from './confort_stadium.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComfortStadium } from './model/confort_stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([ComfortStadium])],
  controllers: [ConfortStadiumController],
  providers: [ConfortStadiumService],
})
export class ConfortStadiumModule {}
