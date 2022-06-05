import { View, Text, Alert, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import { emailRegex } from "../../constants/validation";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { LOG_IN } from "../../graphql/mutations";

const LoginButton = ({ formData }) => {
	const navigation = useNavigation();
	const [logIn, { data, loading, error }] = useMutation(LOG_IN);

	const onLogin = () => {
		if (formData) {
			if (emailRegex.test(formData.email)) {
				logIn({ variables: { data: formData } })
					.then((res) => console.log(res.data))
					.catch((err) => {
						Alert.alert("Uh oh...", `${err.message}`, [
							{ text: "Try Again", style: "cancel" },
						]);
						console.log(err.message);
					});
			} else {
				Alert.alert("Please enter a valid email address");
			}
		} else {
			navigation.navigate("Login");
		}
	};

	return (
		<TouchableCmp
			onPress={onLogin}
			style={{
				borderWidth: 2,
				borderColor: Colors.purple,
				borderRadius: 10,
				height: formData ? 40 : 50,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: formData ? Colors.purple : "transparent",
			}}
		>
			{formData ? (
				!loading ? (
					<Text style={{ fontWeight: "bold", color: "white" }}>Log In</Text>
				) : (
					<ActivityIndicator size="small" color="white" />
				)
			) : (
				<Text
					style={{
						fontWeight: "bold",
						color: formData ? "white" : Colors.purple,
					}}
				>
					Log In
				</Text>
			)}
		</TouchableCmp>
	);
};

export default LoginButton;
