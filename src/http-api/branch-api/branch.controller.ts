import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BranchService } from '../../branch/branch.service';
import { FetchBranchDetailsResponseDto } from './dto/fetch-branch-details-response.dto';

@Controller('branches')
export class BranchController {
	constructor(@Inject(BranchService) private readonly branchService: BranchService) {}

	@Get(':branchId')
	async fetchDetails(@Param('branchId') branchId: string) {
		const branch = await this.branchService.fetchBranchDetails(parseInt(branchId));
		return FetchBranchDetailsResponseDto.fromReadModel(branch);
	}
}
