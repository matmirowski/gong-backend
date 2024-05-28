import { Controller, Inject, Param, Post } from '@nestjs/common';
import { CouponCodeService } from '../../coupon-code/coupon-code.service';
import { CreateCouponCodeResponseDto } from './dto/create-coupon-code-response.dto';

@Controller('branches/:branchId/coupons/:couponId/codes')
export class CouponCodeController {
	constructor(@Inject(CouponCodeService) private readonly couponCodeService: CouponCodeService) {}

	@Post('generate')
	async generate(@Param('couponId') couponId: string) {
		const code = await this.couponCodeService.createCouponCode(parseInt(couponId));
		return CreateCouponCodeResponseDto.fromCouponCode(code);
	}
}
