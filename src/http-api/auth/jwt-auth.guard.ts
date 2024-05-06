import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_CONFIG, JwtConfig } from './jwt.config';
import { UserRole } from '../../user/user';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard {
	constructor(
		private jwtService: JwtService,
		@Inject(JWT_CONFIG) private readonly jwtConfig: JwtConfig,
		@Inject(Reflector) private reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.jwtConfig.secret,
			});

			const authorizedRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());

			if (!authorizedRoles.some((role) => role === payload.role)) {
				return false;
			}

			request['user'] = payload;
		} catch (error) {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
