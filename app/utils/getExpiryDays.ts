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

	if (formatedExpiryDate < today) {
		diffDays = Math.round((+new Date() - +formatedExpiryDate) / oneDay) * -1;
	} else {
		diffDays = Math.round(
			Math.abs((+new Date() - +formatedExpiryDate) / oneDay)
		);
	}

	return diffDays;
};
