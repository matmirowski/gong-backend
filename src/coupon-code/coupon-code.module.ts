import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CouponCodeService } from './coupon-code.service';
import { CouponCodeRepository } from './coupon-code.repository';

@Module({
	imports: [DatabaseModule],
	providers: [CouponCodeService, CouponCodeRepository],
	exports: [CouponCodeService],
})
export class CouponCodeModule {}
