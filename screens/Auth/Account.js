import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const Account = () => {
	const { text } = useTheme().colors;
	return (
		<View>
			<Text style={{ color: text }}>Account</Text>
			<Text style={{ color: text }}>My Wishlist</Text>
		</View>
	);
};

export default Account;
