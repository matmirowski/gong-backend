import { Inject } from '@nestjs/common';
import { DbClient } from '../database/db-client';
import { CouponTable, SelectableCoupon } from '../database/database';
import { CouponReadModel } from './coupon.read-model';
import { Coupon } from './coupon';

const mapTableRecordToReadModel = (record: SelectableCoupon): CouponReadModel => {
	return {
		id: record.id,
		title: record.title,
		description: record.description,
		lifespanInMinutes: record.lifespanInMinutes,
	};
};

const mapEntityToTableRecord = (coupon: Coupon): Omit<CouponTable, 'id'> => {
	return {
		branch_id: coupon.branchId,
		title: coupon.title,
		description: coupon.description,
		lifespanInMinutes: Coupon.LIFESPAN_IN_MINUTES,
	};
};

export class CouponRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async insert(coupon: Coupon) {
		await this.dbClient.db().insertInto('coupon').values(mapEntityToTableRecord(coupon)).execute();
	}

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
