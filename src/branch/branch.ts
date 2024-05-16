import { CreateBranchInput } from './branch.service';

export const BranchStatus = {
	Active: 'active',
	Rejected: 'rejected',
	Pending: 'pending',
} as const;
export type BranchStatus = (typeof BranchStatus)[keyof typeof BranchStatus];

export const BRANCH_STATUS_TO_ID = (status: BranchStatus) => {
	switch (status) {
		case 'active':
			return 1;
		case 'rejected':
			return 2;
		case 'pending':
			return 3;
		default:
			throw new Error('Invalid branch status');
	}
};

interface BranchData {
	id?: number;
	ownerId: number;
	name: string;
	slogan: string;
	phoneNumber: string;
	description: string;
	image: string;
	lowPrice: number;
	highPrice: number;
	categoryId: number;
	statusId: number;
	openingTime: string;
	closingTime: string;
	street: string;
	city: string;
	buildingNumber: number;
	distanceFromUniversity: number;
}

export class Branch {
	public _id?: number;
	public readonly ownerId: number;
	public readonly name: string;
	public readonly slogan: string;
	public readonly phoneNumber: string;
	public readonly description: string;
	public readonly image: string;
	public readonly lowPrice: number;
	public readonly highPrice: number;
	public readonly categoryId: number;
	public readonly statusId: number;
	public readonly openingTime: string;
	public readonly closingTime: string;
	public readonly street: string;
	public readonly city: string;
	public readonly buildingNumber: number;
	public readonly distanceFromUniversity: number;

	constructor(data: BranchData) {
		this._id = data.id;
		this.ownerId = data.ownerId;
		this.name = data.name;
		this.slogan = data.slogan;
		this.phoneNumber = data.phoneNumber;
		this.description = data.description;
		this.image = data.image;
		this.lowPrice = data.lowPrice;
		this.highPrice = data.highPrice;
		this.categoryId = data.categoryId;
		this.statusId = data.statusId;
		this.openingTime = data.openingTime;
		this.closingTime = data.closingTime;
		this.street = data.street;
		this.city = data.city;
		this.buildingNumber = data.buildingNumber;
		this.distanceFromUniversity = data.distanceFromUniversity;
	}

	static new(input: CreateBranchInput) {
		return new Branch({
			ownerId: input.ownerId,
			name: input.data.name,
			slogan: input.data.slogan,
			phoneNumber: input.data.phoneNumber,
			description: input.data.description,
			image: input.data.image,
			lowPrice: input.data.lowerPriceRange,
			highPrice: input.data.higherPriceRange,
			categoryId: input.data.categoryId,
			statusId: BRANCH_STATUS_TO_ID(BranchStatus.Pending),
			openingTime: input.data.openingTime,
			closingTime: input.data.closingTime,
			street: input.data.street,
			city: input.data.city,
			buildingNumber: input.data.buildingNumber,
			distanceFromUniversity: input.data.distanceFromUniversity,
		});
	}
}
