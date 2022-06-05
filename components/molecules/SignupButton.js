import React from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import { useNavigation } from "@react-navigation/native";

import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutations";

// TODO: ERROR HANDLING

/* 
RES.DATA.SIGNUP
	Object {
		__typename
		email
		id
		name
		refreshToken
		token
	}
*/

const SignupButton = ({ formData }) => {
	const navigation = useNavigation();
	const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

	const onSignUp = () => {
		if (formData) {
			signUp({ variables: { data: formData } })
				.then((res) => {
					console.log(res.data.signup);
					// TODO: save res.data.signup to expo-secure-store
				})
				.catch((err) => {
					Alert.alert("Uh oh...", `${err.message}`, [
						{ text: "Try Again", style: "cancel" },
					]);
					console.log(err.message);
				});
		} else {
			navigation.navigate("SignUp");
		}
	};

	return (
		<TouchableCmp
			onPress={onSignUp}
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
			{formData ? (
				!loading ? (
					<Text style={{ fontWeight: "bold", color: "white" }}>Sign up</Text>
				) : (
					<ActivityIndicator size="small" color="white" />
				)
			) : (
				<Text style={{ fontWeight: "bold", color: "white" }}>
					Create an Account
				</Text>
			)}
		</TouchableCmp>
	);
};

export default SignupButton;
