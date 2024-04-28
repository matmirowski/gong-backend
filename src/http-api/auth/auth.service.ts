import { Inject, Injectable } from '@nestjs/common';
import { hash } from './hash';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/user.repository';

export interface SignInSuccesResult {
	type: 'success';
	token: string;
}

export type SignInResult = { type: 'invalid-credentials' } | SignInSuccesResult;

@Injectable()
export class AuthService {
	constructor(
		@Inject(UserRepository) private readonly userRepository: UserRepository,
		@Inject(JwtService) private readonly jwtService: JwtService,
	) {}

	async signIn(login: string, password: string): Promise<SignInResult> {
		const user = await this.userRepository.findOneBy({ login });
		if (!user || user.hashPassword !== hash(password)) {
			return { type: 'invalid-credentials' };
		}

		const payload = {
			userId: user.id,
			role: user.role,
		};

		return {
			type: 'success',
			token: await this.jwtService.signAsync(payload),
		};
	}
}
