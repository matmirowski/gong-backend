export const BranchStatus = {
	Active: 'active',
	Rejected: 'rejected',
	Pending: 'pending',
} as const;
export type BranchStatus = (typeof BranchStatus)[keyof typeof BranchStatus];

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
	openingTime: Date;
	closingTime: Date;
}

export class Branch {
	public readonly id?: number;
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
	public readonly openingTime: Date;
	public readonly closingTime: Date;

	constructor(data: BranchData) {
		this.id = data.id;
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
	}
}
