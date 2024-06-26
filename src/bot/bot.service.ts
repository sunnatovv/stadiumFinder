import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    console.log(ctx);

    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({ where: { user_id: userId } });

    if (!user) {
      await this.botRepo.create({
        user_id: userId,
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
      });
      await ctx.reply(
        `Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else {
      await ctx.reply(
        `bu bot orqali Stadium dasturi muvafaqiyatli muloqot ornatildi`,
        {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        },
      );
    }
  }
  async onContact(ctx: Context) {
    if ('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botRepo.findOne({
        where: { user_id: userId },
      });
      if (!user) {
        await ctx.reply(`Iltimos,<b> "/start"</b> tugmasini bosing`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply(`Iltimos ozingizni telefon raqamingizni yuboring`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .oneTime()
            .resize(),
        });
      } else {
        await this.botRepo.update(
          {
            phone_number: ctx.message.contact.phone_number,
            status: true,
          },
          { where: { user_id: userId } },
        );
      }
      await ctx.reply(`Tabriklayman Royhatdan otdingiz, CONGRATS!!!`, {
        parse_mode: 'HTML',
        ...Markup.removeKeyboard(),
      });
    }
  }
}
