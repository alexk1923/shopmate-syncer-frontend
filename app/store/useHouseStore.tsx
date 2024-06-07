import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { House } from "@/constants/types/HouseTypes";

interface HouseState {
	house: House | null;
	setHouse: (newHouse: House) => void;
	removeHouse: (id: number) => void;
}

export const useHouseStore = create<HouseState>()(
	devtools(
		persist(
			(set, get) => ({
				house: null,
				setHouse: async (newHouse: House) => {
					set({ house: newHouse });
				},
				removeHouse: (id: number) => set({ house: null }),
			}),
			{
				name: "house-storage",
				storage: createJSONStorage(() => AsyncStorage),
			}
		)
	)
);
