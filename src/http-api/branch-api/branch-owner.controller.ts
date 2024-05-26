import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { RequiredAuth } from '../auth/auth-decorator';
import { UserRole } from '../../user/user';
import { ListBranchesQueryDto } from './dto/list-branches-query.dto';
import { BranchService } from '../../branch/branch.service';
import { ListBranchesResponseDto } from './dto/list-branches-response.dto';
import { CreateBranchRequestDto } from './dto/create-branch-request.dto';
import { ModifyBranchRequestDto } from './dto/modify-branch-request.dto';

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

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Post()
	async create(@Param('ownerId') ownerId: string, @Body() input: CreateBranchRequestDto) {
		await this.branchService.createBranch({
			data: input,
			ownerId: parseInt(ownerId),
		});
	}

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Delete(':branchId')
	async remove(@Param('ownerId') ownerId: string, @Param('branchId') branchId: string) {
		await this.branchService.removeBranch(parseInt(ownerId), parseInt(branchId));
	}

	@RequiredAuth({
		roles: [UserRole.Owner],
	})
	@Patch(':branchId')
	async modify(@Param('branchId') branchId: string, @Body() input: ModifyBranchRequestDto) {
		await this.branchService.modifyBranch(parseInt(branchId), input);
	}
}
