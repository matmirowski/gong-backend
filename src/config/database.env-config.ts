import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../database/database.config';

@Injectable()
export class DatabaseConfigFromEnv implements DatabaseConfig {
	get host(): string {
		return String(process.env.DB_HOST);
	}

	get port(): number {
		return Number(process.env.DB_PORT);
	}

	get username(): string {
		return String(process.env.DB_USER);
	}

	get password(): string {
		return String(process.env.DB_PASS);
	}

	get databaseName(): string {
		return String(process.env.DB_NAME);
	}
}
