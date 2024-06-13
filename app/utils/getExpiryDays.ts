import { parseISO, differenceInDays } from "date-fns";

export const getExpiryDays = (expiryDate: Date) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const today = new Date();
	const formatedExpiryDate = new Date(expiryDate);

	let diffDays = 0;

	if (
		formatedExpiryDate.toLocaleDateString() === new Date().toLocaleDateString()
	) {
		return 0;
	}

	diffDays = Math.round((+today - +formatedExpiryDate) / oneDay) * -1;
	if (formatedExpiryDate < today) {
		diffDays *= -1;
	}

	console.log("my expiry date is:");
	console.log(expiryDate);
	console.log("vs.");
	console.log(today);
	console.log(" => au ramas" + diffDays + " zile");

	return diffDays;
};
