import { Inject } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { BranchStatus } from './branch';
import { BranchReadModel } from './branch.read-model';

export interface FindBranchesInput {
	status?: BranchStatus;
	ownerId?: number;
}

export class BranchService {
	constructor(@Inject(BranchRepository) private readonly branchRepository: BranchRepository) {}

	async findBranches(input: FindBranchesInput): Promise<BranchReadModel[]> {
		return await this.branchRepository.findBy({
			status: input.status,
			ownerId: input.ownerId,
		});
	}
}
