import { hash } from '../http-api/auth/hash';

export const UserRole = {
	Admin: 'admin',
	Owner: 'owner',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

interface UserData {
	id?: number;
	email: string;
	login: string;
	hashPassword: string;
	role: UserRole;
}

interface NewUserData {
	email: string;
	login: string;
	password: string;
}

export class User {
	public readonly id?: number;
	public readonly email: string;
	public readonly login: string;
	public readonly hashPassword: string;
	public readonly role: UserRole;

	constructor(data: UserData) {
		this.id = data.id;
		this.email = data.email;
		this.login = data.login;
		this.hashPassword = data.hashPassword;
		this.role = data.role;
	}
	static new(data: NewUserData) {
		return new User({
			email: data.email,
			login: data.login,
			hashPassword: hash(data.password),
			role: UserRole.Owner,
		});
	}
}
