import { Inject } from '@nestjs/common';
import { DbClient } from '../database/db-client';
import { SelectableCoupon } from '../database/database';
import { CouponReadModel } from './coupon.read-model';

const mapTableRecordToReadModel = (record: SelectableCoupon): CouponReadModel => {
	return {
		id: record.id,
		title: record.title,
		description: record.description,
		lifespan: record.lifespan,
	};
};

export class CouponRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async findBy(branchId: number): Promise<CouponReadModel[]> {
		const result = await this.dbClient
			.db()
			.selectFrom('coupon')
			.where('branch_id', '=', branchId)
			.selectAll()
			.execute();

		return result.map(mapTableRecordToReadModel);
	}
}
