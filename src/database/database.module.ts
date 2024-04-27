import { Logger, Module } from '@nestjs/common';
import { DbClient } from './db-client';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [ConfigModule],
	providers: [DbClient, Logger],
	exports: [DbClient],
})
export class DatabaseModule {}
