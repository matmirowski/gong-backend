import { Injectable } from '@nestjs/common';
import { JwtConfig } from '../http-api/auth/jwt.config';

@Injectable()
export class JwtConfigFromEnv implements JwtConfig {
	get secret(): string {
		return String(process.env.JWT_SECRET);
	}
}
