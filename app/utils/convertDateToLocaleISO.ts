export const convertDateToLocaleISO = (date: Date) => {
	const localDate = new Date(date).toLocaleDateString("en-GB");
	const [day, month, year] = localDate.split("/");
	const generalDate = new Date(Number(year), Number(month) - 1, Number(day));
	return generalDate;
};
