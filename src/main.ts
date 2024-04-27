import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbClient } from './database/db-client';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const dbClient = app.get(DbClient);
	await dbClient.applyDbSchema();

	await app.listen(3000);
}
bootstrap();
