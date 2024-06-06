export type ShoppingSchedule = {
	id: number;
	title: string;
	shoppingDate: Date;
	createdBy: {
		id: number;
		username: string;
		firstName: string;
		lastName: string;
	};
};

export type ShoppingScheduleAdd = {
	title: string;
	shoppingDate: Date;
	createdById: number;
};

export type ShoppingDayType = {
	title: string;
	shoppingDate: Date;
};
