import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BranchRepository } from './branch.repository';
import { BranchService } from './branch.service';

@Module({
	imports: [DatabaseModule],
	providers: [BranchRepository, BranchService],
	exports: [BranchService],
})
export class BranchModule {}
