export const getExpiryDays = (expiryDate: Date) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const today = new Date();
	const formatedExpiryDate = new Date(expiryDate);

	console.log(today + "vs" + formatedExpiryDate);

	let diffDays = 0;
	if (formatedExpiryDate < today) {
		diffDays =
			-1 *
			(Math.round(Math.abs((+formatedExpiryDate - +new Date()) / oneDay)) + 1);
	}

	diffDays =
		Math.round(Math.abs((+new Date() - +formatedExpiryDate) / oneDay)) + 1;
	console.log(diffDays);

	return diffDays;
};
