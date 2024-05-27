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

	async remove(branchId: number, couponId: number) {
		await this.dbClient.db().deleteFrom('coupon_code').where('coupon_code.coupon_id', '=', couponId).execute();

		await this.dbClient
			.db()
			.deleteFrom('coupon')
			.where('coupon.branch_id', '=', branchId)
			.where('coupon.id', '=', couponId)
			.execute();
	}
}
