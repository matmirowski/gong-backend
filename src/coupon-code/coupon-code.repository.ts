import { Inject } from '@nestjs/common';
import { DbClient } from '../database/db-client';
import { CouponCode } from './coupon-code';
import { CouponCodeTable } from '../database/database';

const mapEntityToTableRecord = (couponCode: CouponCode): Omit<CouponCodeTable, 'id'> => {
	return {
		coupon_id: couponCode.couponId,
		code: couponCode.code,
		created_at: couponCode.createdAt,
	};
};

export class CouponCodeRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async insert(couponCode: CouponCode) {
		await this.dbClient.db().insertInto('coupon_code').values(mapEntityToTableRecord(couponCode)).execute();
	}
}
