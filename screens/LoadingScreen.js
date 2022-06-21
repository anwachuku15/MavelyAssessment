import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useStateValue } from "../context/StateProvider";

const LoadingScreen = ({ setToken }) => {
	// const navigation = useNavigation()
	const [state, dispatch] = useStateValue();

	const authenticate = async () => {
		try {
			const user = await SecureStore.getItemAsync("user");
			if (user) {
				const _user = JSON.parse(user);
				setToken(_user.token);
				dispatch({
					type: "SET_TOKEN",
					token: _user.token,
				});
				dispatch({
					type: "SET_USER",
					user: _user,
				});
			} else {
				dispatch({
					type: "SET_TOKEN",
					token: null,
				});
			}
		} catch (err) {
			console.log(err);
			Alert.alert("Something went wrong");
		}
		dispatch({
			type: "SET_LOADING",
			isLoading: false,
		});
	};

	useEffect(() => {
		authenticate();
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" color={Colors.purple} />
		</View>
	);
};

export default LoadingScreen;
