import { View, Text } from "react-native";
import React from "react";
import TouchableCmp from "../../components/atoms/TouchableCmp";
import Colors from "../../constants/Colors";
import { useStateValue } from "../../context/StateProvider";
import { useMutation } from "@apollo/client";
import { LOG_OUT } from "../../graphql/mutations";
import * as SecureStore from "expo-secure-store";

const Account = () => {
	const [state, dispatch] = useStateValue();

	const [logout, { client }] = useMutation(LOG_OUT);

	const onPress = async () => {
		// console.log(state);
		try {
			await SecureStore.deleteItemAsync("user");
			dispatch({
				type: "LOGOUT",
			});
			client.resetStore();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<TouchableCmp
				onPress={onPress}
				style={{
					backgroundColor: Colors.purple,
					borderRadius: 5,
					width: "50%",
					height: 50,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
					LOG OUT
				</Text>
			</TouchableCmp>
		</View>
	);
};

export default Account;
