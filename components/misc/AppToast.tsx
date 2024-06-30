import { View, Text } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";

const AppToast = ({
	variant,
	text,
	visible,
}: {
	variant: "success" | "error";
	text: string;
	visible: boolean;
}) => {
	return (
		<Toast
			duration={Toast.durations.LONG}
			visible={true}
			position={Toast.positions.BOTTOM - 100}
			backgroundColor='lightgreen'
			textColor='darkgreen'
			shadow
			animation
			hideOnPress
		>
			{"Success: " + text}
			{/* <RestyleBox flexDirection='row' alignItems='center' gap='s'>
				<FontAwesome6 name='circle-check' size={24} color='black' />
				<RestyleText variant='bodyBold'>
					{variant === "success" ? "Success: " : "Error "}
					<RestyleText variant='body' style={{ maxWidth: 10 }}>
						{text}
					</RestyleText>
				</RestyleText>
			</RestyleBox> */}
		</Toast>
	);
};

export default AppToast;
