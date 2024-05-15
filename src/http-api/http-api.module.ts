import { Module } from '@nestjs/common';
import { UserApiModule } from './user-api/user-api.module';
import { BranchApiModule } from './branch-api/branch-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule, UserApiModule, BranchApiModule],
})
export class HttpApiModule {}
