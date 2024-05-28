interface CouponCode {
	code: string;
	createdAt: Date;
	title: string;
	description: string;
	lifespanInMinutes: number;
}

export type CouponCodeReadModel = Readonly<CouponCode>;
