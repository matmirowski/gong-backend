interface Branch {
	id: number;
	name: string;
	address: {
		street: string;
		city: string;
		buildingNumber: number;
		distanceFromUniversity: number;
	};
}

export type BranchReadModel = Readonly<Branch>;
