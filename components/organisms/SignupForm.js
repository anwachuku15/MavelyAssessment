import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import SignupButton from "../molecules/SignupButton";
import TouchableCmp from "../atoms/TouchableCmp";

import { useNavigation, useTheme } from "@react-navigation/native";

const SignupForm = () => {
	const navigation = useNavigation();
	const { text, card, primary } = useTheme().colors;

	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
	});

	// TODO: VALIDATIONS
	const onChangeName = (text) => {
		setState({ ...state, name: text });
	};

	const onChangeEmail = (text) => {
		setState({ ...state, email: text });
	};

	const onChangePassword = (text) => {
		setState({ ...state, password: text });
	};

	const onCancel = () => {
		navigation.goBack();
	};
	return (
		<KeyboardAvoidingView
			behavior="padding"
			key={Platform.select({ ios: 85, android: 500 })}
		>
			<View>
				<View style={{ height: 50 }} />
				<View style={{ marginVertical: 30 }}>
					<Text style={{ fontSize: 28, fontWeight: "bold", color: text }}>
						Sign Up
					</Text>
				</View>
				<View>
					<Text
						style={{
							fontSize: 14,
							fontWeight: "bold",
							marginBottom: 20,
							color: text,
						}}
					>
						Fill the following fields to sign up
					</Text>

					<TextInput
						style={[
							styles.input,
							{ marginBottom: 15, backgroundColor: card, color: text },
						]}
						placeholder="Name"
						onChangeText={onChangeName}
					/>
					<TextInput
						style={[
							styles.input,
							{ marginBottom: 15, backgroundColor: card, color: text },
						]}
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCapitalize="none"
						placeholder="Email"
						onChangeText={onChangeEmail}
					/>
					<TextInput
						style={[
							styles.input,
							{ marginBottom: 15, backgroundColor: card, color: text },
						]}
						textContentType="password"
						placeholder="Password"
						secureTextEntry
						autoCapitalize="none"
						onChangeText={onChangePassword}
					/>

					<View style={styles.buttonsWrapper}>
						<View style={{ width: "60%" }}>
							<SignupButton formData={state} />
						</View>
						<View style={{ width: "30%" }}>
							<TouchableCmp onPress={onCancel}>
								<Text
									style={{
										color: primary,
										textDecorationLine: "underline",
										fontWeight: "bold",
									}}
								>
									Cancel
								</Text>
							</TouchableCmp>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
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

export default SignupForm;
