import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import RestyleText from "@/components/RestyleText";
import RestyleBox from "@/components/RestyleBox";

export default function PaginationDotsExample() {
	const colors = ["tomato", "thistle", "skyblue", "teal"];
	return <Text>Web</Text>;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	// 	container: { flex: 1, backgroundColor: 'white' },
	child: { width, justifyContent: "center" },
	//   text: { fontSize: width * 0.5, textAlign: 'center' },
});
