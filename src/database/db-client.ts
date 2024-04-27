import { Inject, Injectable, Logger } from '@nestjs/common';
import { Kysely, MysqlDialect, sql } from 'kysely';
import { createPool } from 'mysql2';
import { Database } from './database';
import { DATABASE_CONFIG, DatabaseConfig } from './database.config';
import { promises as fs } from 'fs';

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

	constructor(
		@Inject(DATABASE_CONFIG) private readonly config: DatabaseConfig,
		@Inject(Logger) private readonly logger: Logger,
	) {
		this.kysely = new Kysely<Database>({ dialect: mysqlDialect(config) });
	}

	db() {
		return this.kysely;
	}

	async applyDbSchema() {
		const content = await fs.readFile('src/database/schema.sql', { encoding: 'utf-8' });

		const queries = content.split(/;\s*[\r\n]+/).filter((query) => query.trim() !== '');

		try {
			for (let query of queries) {
				query = query.replace(/\n/g, ' ');
				await sql`${sql.raw(query)}`.execute(this.kysely);
			}
			this.logger.log('Schema applied successfully', 'DATABASE');
		} catch (e) {
			this.logger.log('DB schema not applied - database already up to date', 'DATABASE');
		}
	}
}
