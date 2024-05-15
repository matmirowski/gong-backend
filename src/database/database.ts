import { Generated, Selectable } from 'kysely';

export interface Database {
	enum_status: EnumStatusTable;
	enum_category: EnumCategoryTable;
	user: UserTable;
	branch: BranchTable;
	branch_location: BranchLocationTable;
	coupon: CouponTable;
	coupon_code: CouponCodeTable;
}

interface EnumStatusTable {
	id: Generated<number>;
	description: string;
}

interface EnumCategoryTable {
	id: Generated<number>;
	name: string;
}

export interface UserTable {
	id: Generated<number>;
	email: string;
	login: string;
	hashed_password: string;
	is_admin: boolean;
}
export type SelectableUser = Selectable<UserTable>;

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
export type SelectableBranch = Selectable<BranchTable>;

interface BranchLocationTable {
	id: Generated<number>;
	branch_id: number;
	street: string;
	city: string;
	building_number: number;
	distance_from_university: number;
}
export type SelectableBranchLocation = Selectable<BranchLocationTable>;

interface CouponTable {
	id: Generated<number>;
	branch_id: number;
	title: string;
	description: string;
	lifespan: string;
}

interface CouponCodeTable {
	id: Generated<number>;
	coupon_id: number;
	code: string;
	created_at: Date;
}
