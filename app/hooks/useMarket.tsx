import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";
import { MarketService } from "../services/marketService";

export const useMarket = () => {
	const queryClient = useQueryClient();

	const addMarket = useMutation({
		mutationKey: ["marketAdd"],
		mutationFn: async ({
			name,
			address,
		}: {
			name: string;
			address: string;
		}) => {
			const market = await MarketService.addMarket({ name, address });
			return market;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["market"] });
		},
	});

	const getMarketsQuery = useQuery({
		queryKey: ["market"],
		queryFn: async () => {
			const market = await MarketService.getAllMarkets();
			return market;
		},
	});

	return { addMarket, getMarketsQuery };
};
