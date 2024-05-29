interface CouponCodeData {
	couponId: number;
	code: string;
	createdAt: Date;
}

export class CouponCode {
	public readonly couponId: number;
	public readonly code: string;
	public readonly createdAt: Date;
	public static readonly CODE_LENGTH = 8;

	constructor(data: CouponCodeData) {
		this.couponId = data.couponId;
		this.code = data.code;
		this.createdAt = data.createdAt;
	}

	static new(couponId: number) {
		return new CouponCode({
			couponId,
			code: this.generateCode(),
			createdAt: new Date(),
		});
	}

	private static generateCode(): string {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		const charsLength = chars.length;

		for (let i = 0; i < CouponCode.CODE_LENGTH; i++) {
			result += chars.charAt(Math.floor(Math.random() * charsLength));
		}

		return result;
	}
}
