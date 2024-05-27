import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CouponService } from '../../coupon/coupon.service';
import { ListCouponsResponseDto } from './dto/list-coupons-response.dto';

@Controller('branches/:branchId/coupons')
export class CouponController {
	constructor(@Inject(CouponService) private readonly couponService: CouponService) {}

	@Get()
	async list(@Param('branchId') branchId: string) {
		const result = await this.couponService.findCoupons(parseInt(branchId));
		return ListCouponsResponseDto.fromReadModels(result);
	}
}
