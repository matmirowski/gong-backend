import { Inject } from '@nestjs/common';
import { CouponCodeRepository } from './coupon-code.repository';
import { CouponCode } from './coupon-code';
import { CouponCodeReadModel } from './coupon-code.read-model';
import { ONE_MINUTE } from '../time/time';

export type VerifyCouponCodeResult =
	| { type: 'success'; code: CouponCodeReadModel }
	| { type: 'not-found' }
	| { type: 'code-expired' };

export class CouponCodeService {
	constructor(@Inject(CouponCodeRepository) private readonly couponCodeRepository: CouponCodeRepository) {}

	async createCouponCode(couponId: number): Promise<CouponCode> {
		const couponCode = CouponCode.new(couponId);
		await this.couponCodeRepository.insert(couponCode);
		return couponCode;
	}

	async verifyCouponCode(branchId: number, code: string): Promise<VerifyCouponCodeResult> {
		const couponCode = await this.couponCodeRepository.findOneBy({
			branchId,
			code,
		});
		if (!couponCode) {
			return { type: 'not-found' };
		}

		const expirationDate = new Date(couponCode.createdAt.getTime() + couponCode.lifespanInMinutes * ONE_MINUTE);

		if (expirationDate.getTime() < new Date().getTime()) {
			return { type: 'code-expired' };
		}

		return { type: 'success', code: couponCode };
	}
}
