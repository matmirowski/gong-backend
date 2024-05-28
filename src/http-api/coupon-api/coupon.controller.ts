import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { CouponService } from '../../coupon/coupon.service';
import { ListCouponsResponseDto } from './dto/list-coupons-response.dto';
import { RequiredAuth } from '../auth/auth-decorator';
import { UserRole } from '../../user/user';
import { CreateCouponRequestDto } from '../branch-api/dto/create-coupon-request.dto';

@Controller('branches/:branchId/coupons')
export class CouponController {
	constructor(@Inject(CouponService) private readonly couponService: CouponService) {}

	@Get()
	async list(@Param('branchId') branchId: string) {
		const result = await this.couponService.findCoupons(parseInt(branchId));
		return ListCouponsResponseDto.fromReadModels(result);
	}

	// @RequiredAuth({
	// 	roles: [UserRole.Owner],
	// })
	@Post()
	async create(@Param('branchId') branchId: string, @Body() input: CreateCouponRequestDto) {
		await this.couponService.createCoupon({
			branchId: parseInt(branchId),
			title: input.title,
			description: input.description,
		});
	}

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Delete(':couponId')
	async remove(@Param('branchId') branchId: string, @Param('couponId') couponId: string) {
		await this.couponService.removeCoupon(parseInt(branchId), parseInt(couponId));
	}
}
