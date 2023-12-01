import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('RoboticsLab CRM')
    .setDescription('The RoboticsLab CRM API')
    .setVersion('1.0')
    .addBasicAuth({
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {});
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  createSwagger(app);

  await app.listen(3000);
}
bootstrap();
