interface Branch {
	id: number;
	name: string;
	slogan: string;
	phoneNumber: string;
	description: string;
	image: string;
	priceLow: number;
	priceHigh: number;
	openingTime: string;
	closingTime: string;
	address: {
		street: string;
		city: string;
		buildingNumber: number;
		distanceFromUniversity: number;
	};
}

export type BranchReadModel = Readonly<Branch>;
