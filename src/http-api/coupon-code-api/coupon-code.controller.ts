import { Controller, Inject, Param, Post, Query } from '@nestjs/common';
import { CouponCodeService } from '../../coupon-code/coupon-code.service';
import { CreateCouponCodeResponseDto } from './dto/create-coupon-code-response.dto';
import { VerifyCouponCodeQueryDto } from './dto/verify-coupon-code-query.dto';
import { VerifyCouponCodeResponseDto } from './dto/verify-coupon-code-response.dto';
import { RequiredAuth } from '../auth/auth-decorator';
import { UserRole } from '../../user/user';

@Controller('branches/:branchId/coupons')
export class CouponCodeController {
	constructor(@Inject(CouponCodeService) private readonly couponCodeService: CouponCodeService) {}

	@Post(':couponId/codes/generate')
	async generate(@Param('couponId') couponId: string) {
		const code = await this.couponCodeService.createCouponCode(parseInt(couponId));
		return CreateCouponCodeResponseDto.fromCouponCode(code);
	}

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Post('codes/verify')
	async verifyCode(@Param('branchId') branchId: string, @Query() query: VerifyCouponCodeQueryDto) {
		const result = await this.couponCodeService.verifyCouponCode(parseInt(branchId), query.code);
		return VerifyCouponCodeResponseDto.fromResult(result);
	}
}
