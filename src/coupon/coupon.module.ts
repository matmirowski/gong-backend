import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponRepository } from './coupon.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [CouponService, CouponRepository],
	exports: [CouponService],
})
export class CouponModule {}
