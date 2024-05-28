import { Inject } from '@nestjs/common';
import { CouponCodeRepository } from './coupon-code.repository';
import { CouponCode } from './coupon-code';

export class CouponCodeService {
	constructor(@Inject(CouponCodeRepository) private readonly couponCodeRepository: CouponCodeRepository) {}

	async createCouponCode(couponId: number): Promise<CouponCode> {
		const couponCode = CouponCode.new(couponId);
		await this.couponCodeRepository.insert(couponCode);
		return couponCode;
	}
}
