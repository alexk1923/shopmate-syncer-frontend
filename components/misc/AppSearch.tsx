import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import AppEditInput from "../Form/AppEditInput";
import { useDarkLightTheme } from "../ThemeContext";
import { distance } from "fastest-levenshtein";
import { UseQueryResult } from "@tanstack/react-query";

type AppSearchProps = {
	label: string;
	placeholder: string;
	searchQuery: UseQueryResult<any[], Error>;
	compareField: string;
	renderItem: React.FC;
};

const AppSearch = ({
	label,
	placeholder,
	searchQuery,
	compareField,
	renderItem,
}: AppSearchProps) => {
	const { width, height } = useWindowDimensions();
	const { currentTheme } = useDarkLightTheme();
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<>
			<AppEditInput
				label={"Search for products"}
				placeholder={"Search for products"}
				iconName={"magnifying-glass"}
				iconColor={currentTheme.colors.text}
				iconSize={16}
				value={searchTerm}
				onChangeText={setSearchTerm}
			/>
			{searchQuery.isLoading && <Text>Loading...</Text>}
			{searchQuery.error && <Text>Error: {searchQuery.error.message}</Text>}
			<ScrollView style={[{ maxHeight: height * 0.5 }]}>
				{searchQuery.data &&
					searchQuery.data
						.filter(
							(item: any) =>
								searchTerm.length === 0 ||
								distance(
									item[compareField]
										.toLowerCase()
										.substring(0, searchTerm.length),
									searchTerm.toLowerCase()
								) < 1
						)
						.map((item: any) => renderItem(item))}
			</ScrollView>
		</>
	);
};

export default AppSearch;
