import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('food-api')
  .setDescription('Food API description')
  .setVersion('1.0')
  .addTag('Authorization')
  .addTag('Products')
  .addTag('Diary')
  .build();
