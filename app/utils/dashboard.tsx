import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import { Item } from "@/constants/types/ItemTypes";
import {
	differenceInDays,
	startOfMonth,
	startOfToday,
	startOfYear,
} from "date-fns";
import React from "react";

export const useDashboards = () => {
	const getGroupedItems = (userId: number, items: Item[]) => {
		const tagGroup = new Map<string, number>();
		const tagGroupArr = [];
		items.forEach((item) => {
			if (item.food && item.boughtBy.id === userId) {
				item.food.tags.forEach((tag) => {
					if (tagGroup.has(tag.name)) {
						tagGroup.set(tag.name, tagGroup.get(tag.name)! + 1);
					} else {
						tagGroup.set(tag.name, 1);
					}
				});
			}
		});

		for (const [key, value] of tagGroup) {
			tagGroupArr.push({
				name: FOOD_TAG_INFO[key].name,
				text: `${Math.floor(((value * 100) / items.length) * 100) / 100} %`,
				value,
				color: FOOD_TAG_INFO[key].color,
			});
		}

		return tagGroupArr;
	};

	const getUsersCountItems = (items: Item[]) => {
		const usersGroup = new Map<string, number>();
		const usersGroupArr = [];
		items.forEach((item) => {
			if (usersGroup.has(item.boughtBy.username)) {
				usersGroup.set(
					item.boughtBy.username,
					usersGroup.get(item.boughtBy.username)! + 1
				);
			} else {
				usersGroup.set(item.boughtBy.username, 1);
			}
		});

		for (const [key, value] of usersGroup) {
			usersGroupArr.push({
				value,
				label: key,
			});
		}

		return usersGroupArr;
	};

	const getTotalProductsEvolution = (userId: number, items: Item[]) => {
		const year = startOfYear(startOfToday()).getFullYear();
		const month = startOfMonth(startOfToday());

		const dates = [];
		for (let i = 1; i <= startOfToday().getDate(); i++) {
			dates.push(new Date(year, month.getMonth(), i));
		}

		const productsByDates: {
			label: string;
			value: number;
			dataPointLabelShiftY?: number;
			dataPointLabelShiftX?: number;
			hideDataPoint: boolean;
			dataPointLabelComponent?: () => React.ReactNode;
		}[] = [];

		let totalProducts = 0;
		dates.forEach((date) => {
			// console.log("diferenta pentru data de " + date);
			let productsByDay = 0;
			items.forEach((item) => {
				if (item.food && item.boughtBy.id === userId) {
					const dif = differenceInDays(item.createdAt, date);
					if (dif === 0) {
						productsByDay++;
					}
				}
			});

			productsByDates.push({
				value: totalProducts + productsByDay,
				label: date.getDate().toString(),
				hideDataPoint: productsByDay <= 0,
			});

			totalProducts += productsByDay;
		});

		return productsByDates;
	};

	return { getGroupedItems, getUsersCountItems, getTotalProductsEvolution };
};
