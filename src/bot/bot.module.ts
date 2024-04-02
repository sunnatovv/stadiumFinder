import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './models/bot.update';

@Module({
  controllers: [],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
