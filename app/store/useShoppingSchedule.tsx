import { ShoppingDayType } from "@/constants/types/ShoppingSchedule";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// import type {} from "@redux-devtools/extension"; // required for devtools typing

type ShoppingScheduleParams = {
	shoppingScheduleList: ShoppingDayType[];
	addShoppingSchedule: (newShoppingSchedule: ShoppingDayType) => void;

	// React.Dispatch<React.SetStateAction<FilterType>>;
};

export const useFilterStore = create<ShoppingScheduleParams>()(
	devtools((set, get) => ({
		shoppingScheduleList: [],
		addShoppingSchedule: (newShoppingSchedule) => {
			set({
				shoppingScheduleList: [
					...get().shoppingScheduleList,
					newShoppingSchedule,
				],
			});
		},
	}))
);
