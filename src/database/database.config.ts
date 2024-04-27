export const DATABASE_CONFIG = 'DatabaseConfig';

export interface DatabaseConfig {
	host: string;
	port: number;
	username: string;
	password: string;
	databaseName: string;
}
