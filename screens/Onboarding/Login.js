import { ScrollView, Text } from "react-native";
import React from "react";
import LoginForm from "../../components/organisms/LoginForm";

const Login = () => {
	return (
		<ScrollView
			scrollEnabled={false}
			style={{ marginHorizontal: 20, height: "100%" }}
		>
			<LoginForm />
		</ScrollView>
	);
};

export default Login;
