import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { theme } from "@/theme";
import Toggle from "react-native-toggle-element/lib/toggle";

import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import HorizontalCard from "@/components/cards/HorizontalCard";

const AutoGenerate = () => {
	const [autoGenerate, setAutoGenerate] = useState(false);

	return (
		<HorizontalCard title='Auto-generate'>
			<RestyleBox style={styles.autoGenerateTextContainer}>
				<RestyleBox style={{ flex: 1 }}>
					<RestyleText>
						Choose to use a custom shopping list or let the app generate it from
						preferences
					</RestyleText>
				</RestyleBox>

				<RestyleBox>
					<Toggle
						value={autoGenerate}
						onPress={() => setAutoGenerate(!autoGenerate)}
						thumbButton={{
							width: 30,
							height: 30,
							radius: 30,
							activeBackgroundColor: theme.colors.darkPrimary,
							inActiveBackgroundColor: "#ababab",
						}}
						trackBar={{
							width: 50,
							height: 20,
							activeBackgroundColor: theme.colors.lightPrimary,
							inActiveBackgroundColor: "#cecece",
						}}
					/>
				</RestyleBox>
			</RestyleBox>
		</HorizontalCard>
	);
};

const styles = StyleSheet.create({
	autoGenerateTextContainer: {
		flexDirection: "row",
		gap: theme.spacing.s,
	},
});

export default AutoGenerate;
