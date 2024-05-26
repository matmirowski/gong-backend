import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyBranchRequestDto {
	@IsString()
	@IsNotEmpty()
	slogan: string;

	@IsString()
	@IsNotEmpty()
	description: string;
}
