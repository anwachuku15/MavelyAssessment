import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { emailRegex } from "../../constants/validation";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import LoginButton from "../molecules/LoginButton";

import { useNavigation, useTheme } from "@react-navigation/native";

const LoginForm = () => {
	const navigation = useNavigation();
	const { text, card, primary } = useTheme().colors;

	const [state, setState] = useState({
		email: "",
		password: "",
	});

	const onChangeEmail = (text) => {
		setState({ ...state, email: text });
		if (emailRegex.test(text)) {
			console.log("valid");
		} else {
			console.log("invalid");
		}
	};

	const onChangePassword = (text) => {
		setState({ ...state, password: text });
	};

	return (
		// <ScrollView style={{ marginHorizontal: 20, height: "100%" }}>
		<View>
			<View style={{ height: 50 }} />
			<View style={{ marginVertical: 30 }}>
				<Text style={{ fontSize: 28, color: text, fontWeight: "bold" }}>
					Log In
				</Text>
			</View>
			<View>
				<Text
					style={{
						fontSize: 14,
						color: text,
						fontWeight: "bold",
						marginBottom: 20,
					}}
				>
					Please enter your email and password to log in
				</Text>

				<TextInput
					onChangeText={onChangeEmail}
					style={[
						styles.input,
						{ marginBottom: 15, backgroundColor: card, color: text },
					]}
					textContentType="emailAddress"
					placeholder="Email"
					autoCapitalize="none"
				/>
				<TextInput
					onChangeText={onChangePassword}
					style={[
						styles.input,
						{ marginBottom: 15, backgroundColor: card, color: text },
					]}
					placeholder="Password"
					secureTextEntry
					autoCapitalize="none"
				/>

				<View style={styles.buttonsWrapper}>
					<View style={{ width: "60%" }}>
						<LoginButton formData={state} />
					</View>
					<View style={{ width: "30%" }}>
						<TouchableCmp onPress={() => navigation.goBack()}>
							<Text
								style={{
									color: Colors.purple,
									textDecorationLine: "underline",
									fontWeight: "bold",
								}}
							>
								Cancel
							</Text>
						</TouchableCmp>
					</View>
				</View>
				<TouchableCmp style={{ marginTop: 18 }}>
					<Text style={{ color: text }}>Forgot Password?</Text>
				</TouchableCmp>
			</View>
		</View>
		// </ScrollView>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "100%",
		paddingHorizontal: 13,
		paddingVertical: 13,
		borderRadius: 10,
	},
	buttonsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default LoginForm;
