import { SignInSuccesResult } from '../../auth/auth.service';

export class SignInResponseDto {
	token: string;

	static fromResult(result: SignInSuccesResult) {
		return {
			token: result.token,
		};
	}
}
