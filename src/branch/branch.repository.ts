import { Inject, Injectable } from '@nestjs/common';
import { BranchStatus } from './branch';
import { DbClient } from '../database/db-client';
import { SelectableBranch, SelectableBranchLocation } from '../database/database';
import { BranchReadModel } from './branch.read-model';

interface BranchesQueryInput {
	status?: BranchStatus;
	ownerId?: number;
}

const mapTableRecordToReadModel = (record: SelectableBranch & SelectableBranchLocation): BranchReadModel => {
	return {
		id: record.id,
		name: record.name,
		address: {
			street: record.street,
			city: record.city,
			buildingNumber: record.building_number,
			distanceFromUniversity: record.distance_from_university,
		},
	};
};

@Injectable()
export class BranchRepository {
	constructor(@Inject(DbClient) private readonly dbClient: DbClient) {}

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
}
