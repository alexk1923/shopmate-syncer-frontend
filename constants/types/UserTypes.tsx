type User = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	houseId: number | null;
};

type UpdateUserType = {
	firstName?: string;
	lastName?: string;
	birthday?: Date;
};
