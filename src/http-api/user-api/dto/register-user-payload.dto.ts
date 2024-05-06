import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserRequestDto {
	@IsString()
	@IsNotEmpty()
	login: string;

	@IsEmail()
	email: string;

	//TODO: add validation when requirements specified
	@IsString()
	@IsNotEmpty()
	password: string;
}
