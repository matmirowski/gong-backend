import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';

@Module({
	imports: [
		ConfigModule,
		UserModule,
		JwtModule.register({
			global: true,
			secret: String(process.env.JWT_SECRET),
			signOptions: {
				expiresIn: '6h',
			},
		}),
	],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
