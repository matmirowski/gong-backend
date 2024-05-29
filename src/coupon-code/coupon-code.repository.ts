import { Inject } from '@nestjs/common';
import { DbClient } from '../database/db-client';
import { CouponCode } from './coupon-code';
import { CouponCodeTable, SelectableCoupon, SelectableCouponCode } from '../database/database';
import { CouponCodeReadModel } from './coupon-code.read-model';

export interface CouponCodeQuery {
	branchId: number;
	code: string;
}

const mapEntityToTableRecord = (couponCode: CouponCode): Omit<CouponCodeTable, 'id'> => {
	return {
		coupon_id: couponCode.couponId,
		code: couponCode.code,
		created_at: couponCode.createdAt,
	};
};

const mapTableRecordToReadModel = (record: SelectableCoupon & SelectableCouponCode): CouponCodeReadModel => {
	return {
		code: record.code,
		createdAt: record.created_at,
		title: record.title,
		description: record.description,
		lifespanInMinutes: record.lifespan_in_minutes,
	};
};

export class CouponCodeRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async insert(couponCode: CouponCode) {
		await this.dbClient.db().insertInto('coupon_code').values(mapEntityToTableRecord(couponCode)).execute();
	}

	async findOneBy(input: CouponCodeQuery): Promise<CouponCodeReadModel | undefined> {
		const result = await this.dbClient
			.db()
			.selectFrom('coupon_code')
			.innerJoin('coupon', 'coupon.id', 'coupon_code.coupon_id')
			.where('coupon.branch_id', '=', input.branchId)
			.where('coupon_code.code', '=', input.code)
			.selectAll()
			.executeTakeFirst();

		return result ? mapTableRecordToReadModel(result) : undefined;
	}
}
