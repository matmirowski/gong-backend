import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCouponRequestDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;
}
