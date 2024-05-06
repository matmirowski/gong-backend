import { Module } from '@nestjs/common';
import { DatabaseConfigFromEnv } from './database.env-config';
import { DATABASE_CONFIG } from '../database/database.config';
import { JWT_CONFIG } from '../http-api/auth/jwt.config';
import { JwtConfigFromEnv } from './jwt.env-config';

@Module({
	providers: [
		{
			provide: DATABASE_CONFIG,
			useClass: DatabaseConfigFromEnv,
		},
		{
			provide: JWT_CONFIG,
			useClass: JwtConfigFromEnv,
		},
	],
	exports: [DATABASE_CONFIG, JWT_CONFIG],
})
export class ConfigModule {}
