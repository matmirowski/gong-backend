import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
	imports: [DatabaseModule],
	providers: [UserRepository, UserService],
	exports: [UserRepository, UserService],
})
export class UserModule {}
