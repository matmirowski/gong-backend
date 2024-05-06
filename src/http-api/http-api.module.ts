import { Module } from '@nestjs/common';
import { UserApiModule } from './user-api/user-api.module';

@Module({
	imports: [UserApiModule],
})
export class HttpApiModule {}
