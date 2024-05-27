import { Module } from '@nestjs/common';
import { CouponModule } from '../../coupon/coupon.module';
import { CouponController } from './coupon.controller';

@Module({
	imports: [CouponModule],
	controllers: [CouponController],
})
export class CouponApiModule {}
