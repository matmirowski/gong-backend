import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbClient } from './database/db-client';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	const dbClient = app.get(DbClient);
	await dbClient.applyDbSchema();

	app.enableCors();

	await app.listen(3030);
}
bootstrap();
