import { Controller, Get, Inject, Query } from '@nestjs/common';
import { BranchService } from '../../branch/branch.service';
import { RequiredAuth } from '../auth/auth-decorator';
import { UserRole } from '../../user/user';
import { ListBranchesResponseDto } from './dto/list-branches-response.dto';
import { ListBranchesQueryDto } from './dto/list-branches-query.dto';

@Controller('admin/branches')
export class BranchAdminController {
	constructor(@Inject(BranchService) private readonly branchService: BranchService) {}

	@RequiredAuth({
		roles: [UserRole.Admin],
	})
	@Get()
	async list(@Query() query: ListBranchesQueryDto) {
		const branches = await this.branchService.findBranches({
			status: query.status,
		});
		return ListBranchesResponseDto.fromReadModels(branches);
	}
}
