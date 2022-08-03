import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  const config = new DocumentBuilder()
    .setTitle('EduCity API')
    .setDescription('EduCity API description.')
    .setVersion('1.0')
    .addTag('educity')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
