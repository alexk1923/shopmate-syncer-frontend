import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import { useDarkLightTheme } from "@/components/ThemeContext";
import Separator from "@/components/layout/Separator";
import RestyleBox from "@/components/layout/RestyleBox";
import {
	GestureHandlerRootView,
	TouchableOpacity,
} from "react-native-gesture-handler";

const LanguageSelect = () => {
	const { currentTheme } = useDarkLightTheme();
	const [selectedLanguage, setSelectedLanguage] = useState("English");

	return (
		<GestureHandlerRootView>
			<Wrapper>
				<RestyleText variant='body' color='text'>
					Choose one from the languages available below. We are adding more in
					future updates!
				</RestyleText>
				<FlatList
					data={[{ id: 1, language: "English" }]}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => setSelectedLanguage(item.language)}
						>
							<RestyleBox
								backgroundColor={
									item.language === selectedLanguage
										? "primary"
										: "cardBackground"
								}
								width={"100%"}
								padding='m'
								borderRadius={5}
							>
								<RestyleText
									style={{
										color:
											item.language === selectedLanguage
												? "white"
												: currentTheme.colors.primary,
									}}
									variant='bodyBold'
								>
									{item.language}
								</RestyleText>
							</RestyleBox>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => String(item.id)}
				/>
			</Wrapper>
		</GestureHandlerRootView>
	);
};

export default LanguageSelect;
