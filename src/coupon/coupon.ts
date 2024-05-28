import { CreateCouponInput } from './coupon.service';

interface CouponData {
	branchId: number;
	title: string;
	description: string;
}

export class Coupon {
	public readonly branchId: number;
	public readonly title: string;
	public readonly description: string;
	public static readonly LIFESPAN_IN_MINUTES = 20;

	constructor(data: CouponData) {
		this.branchId = data.branchId;
		this.title = data.title;
		this.description = data.description;
	}

	static new(input: CreateCouponInput) {
		return new Coupon(input);
	}
}
