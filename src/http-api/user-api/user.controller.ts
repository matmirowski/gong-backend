import { BadRequestException, Body, Controller, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user-payload.dto';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth/auth.service';
import { SignInRequestDto } from './dto/sign-in-payload.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';

@Controller('users')
export class UserController {
	constructor(
		@Inject(UserService) private readonly userService: UserService,
		@Inject(AuthService) private readonly authService: AuthService,
	) {}

	@Post('register')
	async registerUser(@Body() payload: RegisterUserRequestDto) {
		const result = await this.userService.registerUser(payload.email, payload.login, payload.password);
		switch (result.type) {
			case 'success':
				return;
			case 'user-already-exists':
				throw new BadRequestException('User with given data already exists');
		}
	}

	@Post('signIn')
	async signIn(@Body() payload: SignInRequestDto): Promise<SignInResponseDto> {
		const result = await this.authService.signIn(payload.login, payload.password);
		switch (result.type) {
			case 'success':
				return SignInResponseDto.fromResult(result);
			case 'invalid-credentials':
				throw new UnauthorizedException();
		}
	}
}
