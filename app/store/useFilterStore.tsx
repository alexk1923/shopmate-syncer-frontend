import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { API_URL } from "../api/config";
import { getToken, removeToken } from "./asyncStorage";
import { router } from "expo-router";
import {
	EXPIRY_STATUS,
	FilterType,
	SORTING_ORDER,
	SORTING_TYPE,
	ADDED_BY_FILTER,
} from "@/constants/types/ItemTypes";

// import type {} from "@redux-devtools/extension"; // required for devtools typing

type FilterParams = {
	filter: FilterType;
	setFilter: (newFilterParams: FilterType) => void;

	// React.Dispatch<React.SetStateAction<FilterType>>;
};

export const useFilterStore = create<FilterParams>()(
	devtools((set, get) => ({
		filter: {
			isFood: false,
			expiredStatus: EXPIRY_STATUS.ALL,
			sortBy: SORTING_TYPE.EXPIRY_DATE,
			sortingOrder: SORTING_ORDER.ASCENDING,
			addedBy: ADDED_BY_FILTER.ALL,
		},
		setFilter: (newFilterParams: FilterType) => {
			set({ filter: newFilterParams });
		},
	}))
);
