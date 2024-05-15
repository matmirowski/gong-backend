import { BranchReadModel } from '../../../branch/branch.read-model';

export class ListedBranchDto {
	id: number;
	name: string;
	address: {
		street: string;
		city: string;
		buildingNumber: number;
		distanceFromUniversity: number;
	};

	static fromReadModel(branch: BranchReadModel): ListedBranchDto {
		return {
			id: branch.id,
			name: branch.name,
			address: {
				street: branch.address.street,
				city: branch.address.city,
				buildingNumber: branch.address.buildingNumber,
				distanceFromUniversity: branch.address.distanceFromUniversity,
			},
		};
	}
}

export class ListBranchesResponseDto {
	static fromReadModels(branches: BranchReadModel[]) {
		return branches.map(ListedBranchDto.fromReadModel);
	}
}
