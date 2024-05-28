import { CouponCode } from '../../../coupon-code/coupon-code';
import { Coupon } from '../../../coupon/coupon';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;

export class CreateCouponCodeResponseDto {
	code: string;
	expiresAt: string;

	static fromCouponCode(couponCode: CouponCode): CreateCouponCodeResponseDto {
		const expiresAt = new Date(
			couponCode.createdAt.getTime() + Coupon.LIFESPAN_IN_MINUTES * ONE_MINUTE,
		).toISOString();
		return {
			code: couponCode.code,
			expiresAt,
		};
	}
}
