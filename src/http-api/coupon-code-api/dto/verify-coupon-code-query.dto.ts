import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCouponCodeQueryDto {
	@IsNotEmpty()
	@IsString()
	code: string;
}
