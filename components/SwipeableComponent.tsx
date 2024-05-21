import React, { useState, useRef } from "react";
import {
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

const rowTranslateAnimatedValues = {};

export default function SwipeToDelete() {
	const [listData, setListData] = useState(
		Array(20)
			.fill("")
			.map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
	);

	const animationIsRunning = useRef(false);

	// const onSwipeValueChange = (swipeData) => {
	// 	const { key, value } = swipeData;
	// 	if (
	// 		value < -Dimensions.get("window").width &&
	// 		!animationIsRunning.current
	// 	) {
	// 		animationIsRunning.current = true;
	// 	}
	// };

	const renderItem = () => (
		<Animated.View>
			<TouchableHighlight
				onPress={() => console.log("You touched me")}
				style={styles.rowFront}
				underlayColor={"#AAA"}
			>
				<View>
					<Text>I am in a SwipeListView</Text>
				</View>
			</TouchableHighlight>
		</Animated.View>
	);

	const renderHiddenItem = () => (
		<View style={styles.rowBack}>
			<View style={[styles.backRightBtn, styles.backRightBtnRight]}>
				<Text style={styles.backTextWhite}>Delete</Text>
			</View>
		</View>
	);

	return (
		<SwipeListView
			data={listData}
			renderItem={(data, rowMap) => (
				<View style={styles.rowFront}>
					<Text>I am "sal" in a SwipeListView</Text>
				</View>
			)}
			renderHiddenItem={(data, rowMap) => (
				<View style={styles.rowBack}>
					<Text>Left</Text>
					<Text>Right</Text>
				</View>
			)}
			leftOpenValue={75}
			rightOpenValue={-75}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "red",
		flex: 1,
	},
	backTextWhite: {
		color: "#FFF",
	},
	rowFront: {
		alignItems: "center",
		backgroundColor: "#CCC",
		borderBottomColor: "black",
		borderBottomWidth: 1,
		justifyContent: "center",
		height: 50,
	},
	rowBack: {
		alignItems: "center",
		backgroundColor: "red",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
	},
	backRightBtnRight: {
		backgroundColor: "red",
		right: 0,
	},
});
