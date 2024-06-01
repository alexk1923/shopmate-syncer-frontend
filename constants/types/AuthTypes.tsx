export type LoginInput = {
	username: string;
	password: string;
};

export type RegisterInput = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string;
};

export type LoginResponse = {
	token: string;
	id: number;
	username: string;
	email: string;
};

export type ApiErrorz = {
	message: string;
	errorType?: string;
};
