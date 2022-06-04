import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";
import LoginButton from "../molecules/LoginButton";

import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
	const navigation = useNavigation();
	return (
		<ScrollView style={{ marginHorizontal: 20, height: "100%" }}>
			<View>
				<View style={{ height: 50 }} />
				<View style={{ marginVertical: 30 }}>
					<Text style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>
						Log In
					</Text>
				</View>
				<View>
					<Text
						style={{
							fontSize: 14,
							color: "white",
							fontWeight: "bold",
							marginBottom: 20,
						}}
					>
						Please enter your email and password to log in
					</Text>

					<TextInput
						style={[styles.input, { marginBottom: 15 }]}
						textContentType="emailAddress"
						placeholder="Email"
						placeholderTextColor={Colors.darkPlaceholder}
					/>
					<TextInput
						style={[styles.input, { marginBottom: 15 }]}
						placeholder="Password"
						placeholderTextColor={Colors.darkPlaceholder}
						secureTextEntry
					/>

					<View style={styles.buttonsWrapper}>
						<View style={{ width: "60%" }}>
							<LoginButton loginForm />
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
						<Text style={{ color: "white" }}>Forgot Password?</Text>
					</TouchableCmp>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "100%",
		paddingHorizontal: 13,
		paddingVertical: 13,
		borderRadius: 10,
		backgroundColor: Colors.darkInput,
		color: "white",
	},
	buttonsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default LoginForm;
