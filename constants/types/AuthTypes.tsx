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
	notificationToken: string | null;
};

export type ApiErrorz = {
	message: string;
	errorType?: string;
};

export type AccountSetupInput = {
	firstName: string;
	lastName: string;
};
