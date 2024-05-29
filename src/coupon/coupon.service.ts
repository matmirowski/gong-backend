import { Inject } from '@nestjs/common';
import { CouponReadModel } from './coupon.read-model';
import { CouponRepository } from './coupon.repository';
import { Coupon } from './coupon';

export interface CreateCouponInput {
	branchId: number;
	title: string;
	description: string;
}

export class CouponService {
	constructor(@Inject(CouponRepository) private readonly couponRepository: CouponRepository) {}

	async findCoupons(branchId: number): Promise<CouponReadModel[]> {
		return await this.couponRepository.findBy(branchId);
	}

	async removeCoupon(branchId: number, couponId: number) {
		await this.couponRepository.remove(branchId, couponId);
	}

	async createCoupon(input: CreateCouponInput) {
		const coupon = Coupon.new(input);
		await this.couponRepository.insert(coupon);
	}
}
