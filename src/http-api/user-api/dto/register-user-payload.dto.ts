import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserRequestDto {
	@IsString()
	@IsNotEmpty()
	login: string;

	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
