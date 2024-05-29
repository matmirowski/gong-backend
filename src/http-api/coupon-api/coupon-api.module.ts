import { Module } from '@nestjs/common';
import { CouponModule } from '../../coupon/coupon.module';
import { CouponController } from './coupon.controller';
import { ConfigModule } from '../../config/config.module';

@Module({
	imports: [ConfigModule, CouponModule],
	controllers: [CouponController],
})
export class CouponApiModule {}
