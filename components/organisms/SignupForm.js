import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import SignupButton from "../molecules/SignupButton";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";

import { useNavigation } from "@react-navigation/native";

const SignupForm = () => {
	const navigation = useNavigation();
	return (
		<ScrollView
			style={{ paddingHorizontal: 20, height: "100%" }}
			indicatorStyle="white"
			showsVerticalScrollIndicator
			bounces={false}
		>
			<KeyboardAvoidingView
				behavior="padding"
				key={Platform.select({ ios: 85, android: 500 })}
			>
				<View>
					<View style={{ height: 50 }} />
					<View style={{ marginVertical: 30 }}>
						<Text style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>
							Sign Up
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
							Fill the following fields to sign up
						</Text>

						<TextInput
							style={[styles.input, { marginBottom: 15 }]}
							placeholder="Name"
							placeholderTextColor={Colors.darkPlaceholder}
						/>
						<TextInput
							style={[styles.input, { marginBottom: 15 }]}
							textContentType="emailAddress"
							keyboardType="email-address"
							autoCapitalize="none"
							placeholder="Email"
							placeholderTextColor={Colors.darkPlaceholder}
						/>
						<TextInput
							style={[styles.input, { marginBottom: 15 }]}
							textContentType="password"
							placeholder="Password"
							placeholderTextColor={Colors.darkPlaceholder}
							secureTextEntry
							autoCapitalize="none"
						/>

						<View style={styles.buttonsWrapper}>
							<View style={{ width: "60%" }}>
								<SignupButton signUpForm />
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
					</View>
				</View>
			</KeyboardAvoidingView>
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

export default SignupForm;
