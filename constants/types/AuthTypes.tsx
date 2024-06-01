export type LoginInput = {
	username: string;
	password: string;
};

export type RegisterInput = {
	username: string;
	password: string;
	confirmPassword: string;
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
