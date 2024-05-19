import { Inject, Injectable } from '@nestjs/common';
import { DbClient } from '../database/db-client';
import { SelectableCategory } from '../database/database';
import { CategoryReadModel } from './category.read-model';

const mapTableRecordToReadModel = (record: SelectableCategory): CategoryReadModel => {
	return {
		id: record.id,
		name: record.name,
	};
};

@Injectable()
export class CategoryRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async findMany(): Promise<CategoryReadModel[]> {
		const result = await this.dbClient.db().selectFrom('enum_category').selectAll().execute();
		return result.map(mapTableRecordToReadModel);
	}
}
