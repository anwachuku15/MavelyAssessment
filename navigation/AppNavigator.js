import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const AppNavigator = () => {
	const AppStack = createStackNavigator();

	return (
		<View>
			<Text>AppNavigator</Text>
		</View>
	);
};

export default AppNavigator;
