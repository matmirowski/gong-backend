import { CategoryReadModel } from 'src/category/category.read-model';

export class ListedCategoryDto {
	id: number;
	name: string;

	static fromReadModel(category: CategoryReadModel): ListedCategoryDto {
		return {
			id: category.id,
			name: category.name,
		};
	}
}

export class ListCategoriesResponseDto {
	static fromReadModels(category: CategoryReadModel[]) {
		return category.map(ListedCategoryDto.fromReadModel);
	}
}
