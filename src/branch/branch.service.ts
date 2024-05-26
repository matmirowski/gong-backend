import { Inject, NotFoundException } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { Branch, BranchStatus } from './branch';
import { BranchReadModel } from './branch.read-model';
import { CreateBranchRequestDto } from '../http-api/branch-api/dto/create-branch-request.dto';

export interface CreateBranchInput {
	data: CreateBranchRequestDto;
	ownerId: number;
}

export interface FindBranchesInput {
	status?: BranchStatus;
	ownerId?: number;
}

export class BranchService {
	constructor(@Inject(BranchRepository) private readonly branchRepository: BranchRepository) {}

	async createBranch(input: CreateBranchInput): Promise<void> {
		const branch = Branch.new(input);
		await this.branchRepository.insert(branch);
	}

	async findBranches(input: FindBranchesInput): Promise<BranchReadModel[]> {
		return await this.branchRepository.findBy({
			status: input.status,
			ownerId: input.ownerId,
		});
	}

	async fetchBranchDetails(branchId: number): Promise<BranchReadModel> {
		const result = await this.branchRepository.findOneBy(branchId);
		if (!result) {
			throw new NotFoundException();
		}
		return result;
	}

	async rejectBranch(branchId: number): Promise<void> {
		await this.branchRepository.reject(branchId);
	}

	async approveBranch(branchId: number): Promise<void> {
		await this.branchRepository.approve(branchId);
	}

	async removeBranch(ownerId: number, branchId: number): Promise<void> {
		await this.branchRepository.remove(ownerId, branchId);
	}
}
