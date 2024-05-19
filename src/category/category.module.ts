import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
	imports: [DatabaseModule],
	providers: [CategoryRepository, CategoryService],
	exports: [CategoryService],
})
export class CategoryModule {}
