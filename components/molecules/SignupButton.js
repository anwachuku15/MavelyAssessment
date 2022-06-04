import { View, Text } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import { useNavigation } from "@react-navigation/native";

const SignupButton = ({ signUpForm }) => {
	const navigation = useNavigation();
	return (
		<TouchableCmp
			onPress={() => {
				if (signUpForm) {
					console.log("SIGN UP");
				} else {
					navigation.navigate("SignUp");
				}
			}}
			style={{
				borderWidth: 2,
				borderColor: Colors.purple,
				borderRadius: 10,
				height: 50,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: Colors.purple,
			}}
		>
			<Text style={{ fontWeight: "bold", color: "white" }}>
				{signUpForm ? "Sign up" : "Create an Account"}
			</Text>
		</TouchableCmp>
	);
};

export default SignupButton;
