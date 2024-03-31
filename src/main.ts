import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Stadium finder')
      .setDescription('Mini project for Stadium finder')
      .setVersion('1.0.0')
      .addTag('NodeJS,NestJs,Postgres,Sequelize,JWT,Swagger,Bot,SMS,Mailer')
      .build();

    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
