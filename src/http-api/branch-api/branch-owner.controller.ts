import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { RequiredAuth } from '../auth/auth-decorator';
import { UserRole } from '../../user/user';
import { ListBranchesQueryDto } from './dto/list-branches-query.dto';
import { BranchService } from '../../branch/branch.service';
import { ListBranchesResponseDto } from './dto/list-branches-response.dto';

@Controller('owner/:ownerId/branches')
export class BranchOwnerController {
	constructor(@Inject(BranchService) private readonly branchService: BranchService) {}

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Get()
	async list(@Param('ownerId') ownerId: string, @Query() query: ListBranchesQueryDto) {
		const branches = await this.branchService.findBranches({
			status: query.status,
			ownerId: parseInt(ownerId),
		});
		return ListBranchesResponseDto.fromReadModels(branches);
	}
}
