import { Module } from '@nestjs/common';
import { CouponCodeController } from './coupon-code.controller';
import { ConfigModule } from '../../config/config.module';
import { CouponCodeModule } from '../../coupon-code/coupon-code.module';

@Module({
	imports: [ConfigModule, CouponCodeModule],
	controllers: [CouponCodeController],
})
export class CouponCodeApiModule {}
