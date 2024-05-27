import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { CouponService } from '../../coupon/coupon.service';
import { ListCouponsResponseDto } from './dto/list-coupons-response.dto';
import { RequiredAuth } from '../auth/auth-decorator';
import { UserRole } from '../../user/user';

@Controller('branches/:branchId/coupons')
export class CouponController {
	constructor(@Inject(CouponService) private readonly couponService: CouponService) {}

	@Get()
	async list(@Param('branchId') branchId: string) {
		const result = await this.couponService.findCoupons(parseInt(branchId));
		return ListCouponsResponseDto.fromReadModels(result);
	}

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Delete(':couponId')
	async remove(@Param('branchId') branchId: string, @Param('couponId') couponId: string) {
		await this.couponService.removeCoupon(parseInt(branchId), parseInt(couponId));
	}
}
