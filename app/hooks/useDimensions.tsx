import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const useDimensions = () => {
	const [dimensions, setDimensions] = useState({
		window: windowDimensions,
		screen: screenDimensions,
	});

	useEffect(() => {
		const subscription = Dimensions.addEventListener(
			"change",
			({ window, screen }) => {
				setDimensions({ window, screen });
			}
		);
		return () => subscription?.remove();
		console.log(dimensions);
	});

	return { dimensions, setDimensions };
};
