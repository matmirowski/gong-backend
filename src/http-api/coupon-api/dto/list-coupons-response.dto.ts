import { CouponReadModel } from '../../../coupon/coupon.read-model';

export class ListedCouponDto {
	id: number;
	title: string;
	description: string;
	lifespan: string;

	static fromReadModel(coupon: CouponReadModel): ListedCouponDto {
		return {
			id: coupon.id,
			title: coupon.title,
			description: coupon.description,
			lifespan: coupon.lifespan,
		};
	}
}

export class ListCouponsResponseDto {
	static fromReadModels(coupons: CouponReadModel[]) {
		return coupons.map(ListedCouponDto.fromReadModel);
	}
}