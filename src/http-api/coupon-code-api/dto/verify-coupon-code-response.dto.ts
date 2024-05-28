import { VerifyCouponCodeResult } from '../../../coupon-code/coupon-code.service';

export class VerifyCouponCodeResponseDto {
	type: 'success' | 'code-expired' | 'not-found';
	title: string | null;
	description: string | null;

	static fromResult(result: VerifyCouponCodeResult): VerifyCouponCodeResponseDto {
		if (result.type === 'success') {
			return {
				type: result.type,
				title: result.code.title,
				description: result.code.description,
			};
		}
		return {
			type: result.type,
			title: null,
			description: null,
		};
	}
}
