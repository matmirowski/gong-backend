import { Module } from '@nestjs/common';
import { BranchOwnerController } from './branch-owner.controller';
import { ConfigModule } from '../../config/config.module';
import { BranchModule } from '../../branch/branch.module';
import { BranchAdminController } from './branch-admin.controller';

@Module({
	imports: [ConfigModule, BranchModule],
	controllers: [BranchOwnerController, BranchAdminController],
})
export class BranchApiModule {}
