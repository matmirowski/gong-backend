import { IsEnum } from 'class-validator';
import { BranchStatus } from '../../../branch/branch';

export class ListBranchesQueryDto {
	@IsEnum(BranchStatus)
	status?: BranchStatus;
}
