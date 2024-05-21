import { StyleSheet } from "react-native";
import React from "react";
import RestyleText from "@/components/RestyleText";
import Wrapper from "@/components/Wrapper";

type IntroScreenProps = {
	SvgComponent: React.JSX.Element;
	ExtraComponent: React.JSX.Element;
	title: string;
	description: string;
};

const IntroScreen = (props: IntroScreenProps) => {
	return (
		<Wrapper style={{ justifyContent: "center" }}>
			{props.SvgComponent}
			<RestyleText variant='header' textAlign='center' color='text'>
				{props.title}
			</RestyleText>
			<RestyleText variant='body' textAlign='center' color='text'>
				{props.description}
			</RestyleText>
			{props.ExtraComponent}

			{/* <AppButton title='Next' onPress={() => {}} variant={"outline"} /> */}
		</Wrapper>
	);
};

export default IntroScreen;
