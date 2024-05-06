import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../../user/user';
import { JwtAuthGuard } from './jwt-auth.guard';

interface RequiredAuthOptions {
	roles: UserRole[];
}

export function RequiredAuth(options: RequiredAuthOptions) {
	const guards: Parameters<typeof UseGuards> = [];
	guards.push(JwtAuthGuard);

	const decorators: Parameters<typeof applyDecorators> = [UseGuards(...guards)];

	decorators.push(SetMetadata('roles', options.roles));

	return applyDecorators(...decorators);
}
