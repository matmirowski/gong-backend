import { Module } from '@nestjs/common';
import { UserApiModule } from './user-api/user-api.module';
import { BranchApiModule } from './branch-api/branch-api.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryApiModule } from './category-api/category-api.module';

@Module({
	imports: [ConfigModule, UserApiModule, BranchApiModule, CategoryApiModule],
})
export class HttpApiModule {}
