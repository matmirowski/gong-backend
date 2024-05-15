import { Module } from '@nestjs/common';
import { BranchOwnerController } from './branch-owner.controller';
import { ConfigModule } from '../../config/config.module';
import { BranchModule } from '../../branch/branch.module';

@Module({
	imports: [ConfigModule, BranchModule],
	controllers: [BranchOwnerController],
})
export class BranchApiModule {}
