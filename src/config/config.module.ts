import { Module } from '@nestjs/common';
import { DatabaseConfigFromEnv } from './database.env-config';
import { DATABASE_CONFIG } from '../database/database.config';

@Module({
	providers: [
		{
			provide: DATABASE_CONFIG,
			useClass: DatabaseConfigFromEnv,
		},
	],
	exports: [DATABASE_CONFIG],
})
export class ConfigModule {}
