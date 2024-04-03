import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { Comfort } from './comfort/models/comfort.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/models/category.model';
import { DistrictModule } from './district/district.module';
import { District } from './district/models/district.model';
import { RegionModule } from './region/region.module';
import { AdminModule } from './admin/admin.module';
import { Region } from './region/models/region.model';
import { Admin } from './admin/models/admin.model';
import { MailModule } from './mail/mail.module';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { Bot } from './bot/models/bot.model';
import { CommentsModule } from './comments/comments.module';
import { Cart } from './cart/model/cart.model';
import { Comments } from './comments/models/comment.model';
import { ComfortStadium } from './confort_stadium/model/confort_stadium.model';
import { Media } from './media/model/media.model';
import { StadiumTimes } from './stadium_times/model/stadium_time.model';
import { Stadiums } from './stadiums/model/stadium.model';
import { UserCart } from './user_cart/model/user_cart.model';
import { UserWallet } from './user_wallet/model/user_wallet.model';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),

    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Comfort, Category, District, Region, Admin,Bot,Cart,Comments,ComfortStadium,Media,StadiumTimes,Stadiums,UserCart,UserWallet,],  
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    UsersModule,
    ComfortModule,
    CategoriesModule,
    DistrictModule,
    RegionModule,
    AdminModule,
    MailModule,
    BotModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
