import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	useColorScheme,
} from "react-native";
import SignupButton from "../molecules/SignupButton";
import Colors from "../../constants/Colors";
import TouchableCmp from "../atoms/TouchableCmp";

import { useNavigation, useTheme } from "@react-navigation/native";
// import Typography from "../atoms/Typography";

const SignupForm = () => {
	const navigation = useNavigation();
	const { text, card, primary } = useTheme().colors;
	const [bounces, setBounces] = useState(true);
	const onScroll = (e) => {
		const currentOffset = e.nativeEvent.contentOffset.y;

		if (currentOffset <= 0) {
			setBounces(false);
		} else {
			setBounces(true);
		}
	};
	return (
		<ScrollView
			style={{ paddingHorizontal: 20, height: "100%" }}
			indicatorStyle="white"
			showsVerticalScrollIndicator
			bounces={bounces}
		>
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
						/>

						<View style={styles.buttonsWrapper}>
							<View style={{ width: "60%" }}>
								<SignupButton signUpForm />
							</View>
							<View style={{ width: "30%" }}>
								<TouchableCmp onPress={() => navigation.goBack()}>
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
		</ScrollView>
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
