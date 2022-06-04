import { View, Text } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import { useNavigation } from "@react-navigation/native";

const LoginButton = ({ loginForm }) => {
	const navigation = useNavigation();
	const login = () => {
		console.log("LOGIN");
	};

	return (
		<TouchableCmp
			onPress={() => {
				if (loginForm) {
					login();
				} else {
					navigation.navigate("Login");
				}
			}}
			style={{
				borderWidth: 2,
				borderColor: Colors.purple,
				borderRadius: 10,
				height: loginForm ? 40 : 50,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: loginForm ? Colors.purple : "transparent",
			}}
		>
			<Text
				style={{
					fontWeight: "bold",
					color: loginForm ? "white" : Colors.purple,
				}}
			>
				Log In
			</Text>
		</TouchableCmp>
	);
};

export default LoginButton;
