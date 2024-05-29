import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreateBranchRequestDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	slogan: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	street: string;

	@IsString()
	@IsNotEmpty()
	city: string;

	@IsInt()
	buildingNumber: number;

	@IsString()
	phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	image: string;

	@IsInt()
	@IsPositive()
	lowerPriceRange: number;

	@IsInt()
	@IsPositive()
	higherPriceRange: number;

	@IsInt()
	@IsPositive()
	distanceFromUniversity: number;

	@IsInt()
	@Min(0)
	categoryId: number;

	@IsString()
	@IsNotEmpty()
	openingTime: string;

	@IsString()
	@IsNotEmpty()
	closingTime: string;
}
