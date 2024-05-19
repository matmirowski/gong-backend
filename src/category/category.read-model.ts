interface Category {
	id: number;
	name: string;
}

export type CategoryReadModel = Readonly<Category>;
