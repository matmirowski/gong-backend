import { Inject } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryReadModel } from './category.read-model';

export class CategoryService {
	constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

	async findCategories(): Promise<CategoryReadModel[]> {
		return await this.categoryRepository.findMany();
	}
}
