import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { CategoryModule } from 'src/category/category.module';
import { CategoryController } from './category.controller';

@Module({
	imports: [ConfigModule, CategoryModule],
	controllers: [CategoryController],
})
export class CategoryApiModule {}
