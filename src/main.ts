import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));


  const PORT = process.env.HTTP_PORT || 5000;
  const config = new DocumentBuilder()
    .setTitle('Envoices')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT,()=>{
    Logger.log(`envoice server started at ${PORT}`, 'server' );
    Logger.log(`Mongo DB connected on ${process.env.db_host}`,'DataBase')
    Logger.log(`http://localhost:${PORT}/api`,"swagger")
  });


}
bootstrap();
