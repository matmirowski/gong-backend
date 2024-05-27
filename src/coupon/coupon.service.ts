import { Inject } from '@nestjs/common';
import { CouponReadModel } from './coupon.read-model';
import { CouponRepository } from './coupon.repository';

export class CouponService {
	constructor(@Inject(CouponRepository) private readonly couponRepository: CouponRepository) {}

	async findCoupons(branchId: number): Promise<CouponReadModel[]> {
		return await this.couponRepository.findBy(branchId);
	}
}
