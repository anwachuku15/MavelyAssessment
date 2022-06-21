import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import NetworkLogger from "react-native-network-logger";
import { useNavigation, useTheme } from "@react-navigation/native";

const Network = () => {
	const { dark } = useTheme();
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
		});
	});
	return <NetworkLogger theme={dark ? "dark" : "light"} />;
};

export default Network;
