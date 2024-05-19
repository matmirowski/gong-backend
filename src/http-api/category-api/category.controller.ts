import { Controller, Get, Inject } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { ListCategoriesResponseDto } from './dto/list-categories-response.dto';

@Controller('categories')
export class CategoryController {
	constructor(@Inject(CategoryService) private readonly categoryService: CategoryService) {}

	@Get()
	async listCategories() {
		const result = await this.categoryService.findCategories();
		return ListCategoriesResponseDto.fromReadModels(result);
	}
}
