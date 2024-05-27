import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbClient } from './database/db-client';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});

	app.useGlobalPipes(new ValidationPipe());

	const dbClient = app.get(DbClient);
	await dbClient.applyDbSchema();

	app.enableCors();

	app.use(json({ limit: '50mb' }));

	await app.listen(3030);
}
bootstrap();
