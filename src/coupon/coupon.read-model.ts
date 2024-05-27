interface Coupon {
	id: number;
	title: string;
	description: string;
	lifespan: string;
}

export type CouponReadModel = Readonly<Coupon>;
