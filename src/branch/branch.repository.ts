import { Inject, Injectable } from '@nestjs/common';
import { BRANCH_STATUS_TO_ID, Branch, BranchStatus } from './branch';
import { DbClient } from '../database/db-client';
import { BranchLocationTable, BranchTable, SelectableBranch, SelectableBranchLocation } from '../database/database';
import { BranchReadModel } from './branch.read-model';

interface BranchesQueryInput {
	status?: BranchStatus;
	ownerId?: number;
}

interface BranchesModifyInput {
	description: string;
	slogan: string;
}

const mapTableRecordToReadModel = (record: SelectableBranch & SelectableBranchLocation): BranchReadModel => {
	return {
		id: record.branch_id,
		name: record.name,
		slogan: record.slogan,
		phoneNumber: record.phone_number,
		description: record.description,
		image: record.image_base64,
		priceLow: record.price_low,
		priceHigh: record.price_high,
		openingTime: record.opening_time,
		closingTime: record.closing_time,
		address: {
			street: record.street,
			city: record.city,
			buildingNumber: record.building_number,
			distanceFromUniversity: record.distance_from_university,
		},
	};
};

const mapBranchToBranchTableRecord = (branch: Branch): Omit<BranchTable, 'id'> => {
	return {
		owner_id: branch.ownerId,
		name: branch.name,
		slogan: branch.slogan,
		phone_number: branch.phoneNumber,
		description: branch.description,
		status_id: branch.statusId,
		image_base64: branch.image,
		price_low: branch.lowPrice,
		price_high: branch.highPrice,
		category_id: branch.categoryId,
		opening_time: branch.openingTime,
		closing_time: branch.closingTime,
	};
};

const mapBranchToBranchLocationTableRecord = (branch: Branch, branchId: number): Omit<BranchLocationTable, 'id'> => {
	return {
		branch_id: branchId,
		street: branch.street,
		city: branch.city,
		building_number: branch.buildingNumber,
		distance_from_university: branch.distanceFromUniversity,
	};
};

@Injectable()
export class BranchRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

	async insert(branch: Branch) {
		await this.dbClient
			.db()
			.insertInto('branch')
			.values(mapBranchToBranchTableRecord(branch))
			.executeTakeFirstOrThrow();

		const result = await this.dbClient
			.db()
			.selectFrom('branch')
			.select('id')
			.orderBy('id', 'desc')
			.limit(1)
			.executeTakeFirstOrThrow();

		await this.dbClient
			.db()
			.insertInto('branch_location')
			.values(mapBranchToBranchLocationTableRecord(branch, result.id))
			.executeTakeFirstOrThrow();
	}

	async findBy(input: BranchesQueryInput): Promise<BranchReadModel[]> {
		let query = this.dbClient
			.db()
			.selectFrom('branch')
			.innerJoin('branch_location', 'branch_location.branch_id', 'branch.id')
			.innerJoin('enum_status', 'enum_status.id', 'branch.status_id')
			.innerJoin('user', 'user.id', 'branch.owner_id');

		if (input.status) {
			query = query.where('enum_status.description', '=', input.status);
		}

		if (input.ownerId) {
			query = query.where('user.id', '=', input.ownerId);
		}
		const results = await query.selectAll().execute();

		return results.map(mapTableRecordToReadModel);
	}

	async findOneBy(branchId: number): Promise<BranchReadModel | undefined> {
		const result = await this.dbClient
			.db()
			.selectFrom('branch')
			.innerJoin('branch_location', 'branch_location.branch_id', 'branch.id')
			.where('branch.id', '=', branchId)
			.selectAll()
			.executeTakeFirst();

		return result ? mapTableRecordToReadModel(result) : undefined;
	}

	async reject(branchId: number) {
		await this.dbClient
			.db()
			.updateTable('branch')
			.set({
				status_id: BRANCH_STATUS_TO_ID(BranchStatus.Rejected),
			})
			.where('id', '=', branchId)
			.executeTakeFirstOrThrow();
	}

	async approve(branchId: number) {
		await this.dbClient
			.db()
			.updateTable('branch')
			.set({
				status_id: BRANCH_STATUS_TO_ID(BranchStatus.Active),
			})
			.where('id', '=', branchId)
			.executeTakeFirstOrThrow();
	}

	async remove(ownerId: number, branchId: number) {
		await this.dbClient
			.db()
			.deleteFrom('branch_location')
			.where('branch_location.branch_id', '=', branchId)
			.executeTakeFirst();
		await this.dbClient
			.db()
			.deleteFrom('branch')
			.where('branch.owner_id', '=', ownerId)
			.where('branch.id', '=', branchId)
			.executeTakeFirst();
	}

	async modify(branchId: number, input: BranchesModifyInput) {
		await this.dbClient
			.db()
			.updateTable('branch')
			.set({
				slogan: input.slogan,
				description: input.description,
			})
			.where('id', '=', branchId)
			.execute();
	}
}
