interface Coupon {
	id: number;
	title: string;
	description: string;
	lifespanInMinutes: number;
}

export type CouponReadModel = Readonly<Coupon>;
