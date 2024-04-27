import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
	enumStatus: EnumStatusTable;
	enumCategory: EnumCategoryTable;
	user: UserTable;
	branch: BranchTable;
	branchLocation: BranchLocationTable;
	coupon: CouponTable;
	couponCode: CouponCodeTable;
}

interface EnumStatusTable {
	id: Generated<number>;
	description: string;
}

export type EnumStatus = Selectable<EnumStatusTable>;
export type NewEnumStatus = Insertable<EnumStatusTable>;

interface EnumCategoryTable {
	id: Generated<number>;
	name: string;
}

export type EnumCategory = Selectable<EnumCategoryTable>;
export type NewEnumCategory = Insertable<EnumCategoryTable>;

interface UserTable {
	id: Generated<number>;
	email: string;
	login: string;
	hashed_password: string;
	is_admin: boolean;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;

interface BranchTable {
	id: Generated<number>;
	owner_id: number;
	name: string;
	slogan: string;
	phone_number: string;
	description: string;
	status_id: number;
	image_base64: string;
	price_low: number;
	price_high: number;
	category_id: number;
	opening_time: string;
	closing_time: string;
}

export type Branch = Selectable<BranchTable>;
export type NewBranch = Insertable<BranchTable>;
export type BranchUpdate = Updateable<BranchTable>;

interface BranchLocationTable {
	id: Generated<number>;
	branch_id: number;
	street: string;
	city: string;
	building_number: number;
	distance_from_university: number;
}

export type BranchLocation = Selectable<BranchLocationTable>;
export type NewBranchLocation = Insertable<BranchLocationTable>;
export type BranchLocationUpdate = Updateable<BranchLocationTable>;

interface CouponTable {
	id: Generated<number>;
	branch_id: number;
	title: string;
	description: string;
	lifespan: string;
}

export type Coupon = Selectable<CouponTable>;
export type NewCoupon = Insertable<CouponTable>;
export type CouponUpdate = Updateable<CouponTable>;

interface CouponCodeTable {
	id: Generated<number>;
	coupon_id: number;
	code: string;
	created_at: Date;
}

export type CouponCode = Selectable<CouponCodeTable>;
export type NewCouponCode = Insertable<CouponCodeTable>;
export type CouponCodeUpdate = Updateable<CouponCodeTable>;
