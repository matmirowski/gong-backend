import { Inject, Injectable } from '@nestjs/common';
import { DbClient } from '../database/db-client';
import { User, UserRole } from './user';
import { SelectableUser, UserTable } from '../database/database';

export interface FindOneInput {
	login?: string;
	email?: string;
	role?: UserRole;
}

const mapTableRecordToEntity = (record: SelectableUser): User => {
	return new User({
		id: Number(record.id),
		email: record.email,
		login: record.login,
		hashPassword: record.hashed_password,
		role: record.is_admin ? UserRole.Admin : UserRole.Owner,
	});
};

const mapEntityToTableRecord = (user: User): Omit<UserTable, 'id'> => {
	return {
		email: user.email,
		login: user.login,
		hashed_password: user.hashPassword,
		is_admin: user.role === UserRole.Admin ? true : false,
	};
};

@Injectable()
export class UserRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async insert(user: User): Promise<void> {
		await this.dbClient.db().insertInto('user').values(mapEntityToTableRecord(user)).executeTakeFirstOrThrow();
	}

	async findOneBy(input: FindOneInput): Promise<User | undefined> {
		let query = this.dbClient.db().selectFrom('user');

		if (input.login) {
			query = query.where('login', '=', input.login);
		}

		if (input.email) {
			query = query.where('email', '=', input.email);
		}

		if (input.role) {
			query.where('is_admin', '=', input.role === 'admin');
		}

		const record = await query.selectAll().executeTakeFirst();
		return record ? mapTableRecordToEntity(record) : undefined;
	}
}
