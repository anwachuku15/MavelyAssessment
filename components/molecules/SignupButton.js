import React from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import { useNavigation } from "@react-navigation/native";

import { useLazyQuery, useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutations";

import * as SecureStore from "expo-secure-store";
import { GET_PRODUCTS } from "../../graphql/queries";
import { useStateValue } from "../../context/StateProvider";

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
	const [signup, { data, loading, error, client }] = useMutation(SIGN_UP);
	const navigation = useNavigation();

	const [{ isLoading }, dispatch] = useStateValue();

	const onSignUp = async () => {
		if (formData) {
			try {
				const userInfo = await signup({ variables: { data: formData } });
				await SecureStore.setItemAsync(
					"user",
					JSON.stringify(userInfo.data.signup)
				);
				dispatch({
					type: "SET_USER",
					user: userInfo.data.signup,
				});
				dispatch({
					type: "SET_LOADING",
					isLoading: true,
				});
			} catch (err) {
				console.log(error);
				Alert.alert("Uh oh...", `${err.message}`, [
					{ text: "Try Again", style: "cancel" },
				]);
			}
		} else {
			const user = await SecureStore.getItemAsync("user");
			console.log(JSON.parse(user));
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
