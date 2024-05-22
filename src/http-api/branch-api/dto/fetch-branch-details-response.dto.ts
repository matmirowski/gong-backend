import { BranchReadModel } from '../../../branch/branch.read-model';

export class FetchBranchDetailsResponseDto {
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

	static fromReadModel(branch: BranchReadModel): FetchBranchDetailsResponseDto {
		return {
			id: branch.id,
			name: branch.name,
			slogan: branch.slogan,
			phoneNumber: branch.phoneNumber,
			description: branch.description,
			image: branch.image,
			priceLow: branch.priceLow,
			priceHigh: branch.priceHigh,
			openingTime: branch.openingTime,
			closingTime: branch.closingTime,
			address: {
				street: branch.address.street,
				city: branch.address.city,
				buildingNumber: branch.address.buildingNumber,
				distanceFromUniversity: branch.address.distanceFromUniversity,
			},
		};
	}
}
