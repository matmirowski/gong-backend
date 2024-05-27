import { Module } from '@nestjs/common';
import { UserApiModule } from './user-api/user-api.module';
import { BranchApiModule } from './branch-api/branch-api.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryApiModule } from './category-api/category-api.module';
import { CouponApiModule } from './coupon-api/coupon-api.module';

@Module({
	imports: [ConfigModule, UserApiModule, BranchApiModule, CategoryApiModule, CouponApiModule],
})
export class HttpApiModule {}
