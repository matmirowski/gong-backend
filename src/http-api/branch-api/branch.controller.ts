import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { BranchService } from '../../branch/branch.service';
import { FetchBranchDetailsResponseDto } from './dto/fetch-branch-details-response.dto';
import { BranchStatus } from '../../branch/branch';
import { ListBranchesResponseDto } from './dto/list-branches-response.dto';

@Controller('branches')
export class BranchController {
	constructor(@Inject(BranchService) private readonly branchService: BranchService) {}

	@Get(':branchId')
	async fetchDetails(@Param('branchId') branchId: string) {
		const branch = await this.branchService.fetchBranchDetails(parseInt(branchId));
		return FetchBranchDetailsResponseDto.fromReadModel(branch);
	}

	@Get()
	async listBranches(@Query('categoryId') categoryId?: string) {
		const branches = await this.branchService.findBranches({
			status: BranchStatus.Active,
			sortByDistance: true,
			categoryId: categoryId ? parseInt(categoryId) : undefined,
		});
		return ListBranchesResponseDto.fromReadModels(branches);
	}
}
