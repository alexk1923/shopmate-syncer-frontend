import React, { useEffect, useRef } from "react";
import {
	Modal,
	View,
	ActivityIndicator,
	StyleSheet,
	Animated,
} from "react-native";
import LottieAnimation from "../common/LottieAnimation";
import { ANIMATIONS } from "@/constants/assets";
import RestyleText from "../layout/RestyleText";
import RestyleBox from "../layout/RestyleBox";

const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
	const Dot = ({ delay }: { delay: number }) => {
		const opacity = useRef(new Animated.Value(0)).current;

		useEffect(() => {
			Animated.loop(
				Animated.sequence([
					Animated.timing(opacity, {
						toValue: 1,
						duration: 300,
						useNativeDriver: true,
						delay: delay,
					}),
					Animated.timing(opacity, {
						toValue: 0,
						duration: 50,
						useNativeDriver: true,
						delay: 1800 - 300 - delay,
					}),
				])
			).start();
		}, [opacity, delay]);

		return <Animated.Text style={[styles.dot, { opacity }]}>.</Animated.Text>;
	};

	return (
		<Modal
			transparent={true}
			animationType='none'
			visible={isVisible}
			onRequestClose={() => {}}
		>
			<View style={styles.modalBackground}>
				{/* <ActivityIndicator animating={isVisible} size='large' color='#ffffff' />
				 */}

				<LottieAnimation animationName={ANIMATIONS.LOADING_CART} />
				<RestyleBox flexDirection='row' style={{ bottom: "50%" }}>
					<RestyleText style={{ color: "white" }} variant='subheader'>
						Loading
					</RestyleText>
					<View style={styles.dotsContainer}>
						<Dot delay={0} />
						<Dot delay={600} />
						<Dot delay={1200} />
					</View>
				</RestyleBox>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	activityIndicatorWrapper: {
		backgroundColor: "#00000040",
		height: "100%",
		width: "100%",
		borderRadius: 90,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	dotsContainer: {
		flexDirection: "row",
		marginLeft: 5,
		alignSelf: "flex-start",
	},
	dot: {
		fontSize: 24,
		color: "white",
		marginHorizontal: 2,
	},
});

export default LoadingOverlay;
