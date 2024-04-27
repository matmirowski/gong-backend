import { Inject, Injectable } from '@nestjs/common';
import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { Database } from './database';
import { DATABASE_CONFIG, DatabaseConfig } from './database.config';

const mysqlDialect = (config: DatabaseConfig) =>
	new MysqlDialect({
		pool: createPool({
			database: config.databaseName,
			host: config.host,
			user: config.username,
			password: config.password,
			port: config.port,
			connectionLimit: 10,
		}),
	});

@Injectable()
export class DbClient {
	private readonly kysely: Kysely<Database>;

	constructor(@Inject(DATABASE_CONFIG) private readonly config: DatabaseConfig) {
		this.kysely = new Kysely<Database>({ dialect: mysqlDialect(config) });
	}

	db() {
		return this.kysely;
	}
}
