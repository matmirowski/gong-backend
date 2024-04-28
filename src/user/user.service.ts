import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user';

export type UserRegisterResult = { type: 'success' } | { type: 'user-already-exists' };

@Injectable()
export class UserService {
	constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

	async registerUser(email: string, login: string, password: string): Promise<UserRegisterResult> {
		const foundUser = await this.userRepository.findOneBy({ login, email });
		if (foundUser) {
			return { type: 'user-already-exists' };
		}

		const user = User.new({
			email,
			login,
			password,
		});

		await this.userRepository.insert(user);
		return { type: 'success' };
	}
}
