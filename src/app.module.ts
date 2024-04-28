import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HttpApiModule } from './http-api/http-api.module';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule, HttpApiModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
