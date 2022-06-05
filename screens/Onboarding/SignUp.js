import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import SignupForm from "../../components/organisms/SignupForm";
import { useTheme, useNavigation } from "@react-navigation/native";

const SignUp = () => {
	const { dark } = useTheme();
	const navigation = useNavigation();
	let offset = 0;
	const onScroll = (e) => {
		const currentOffset = e.nativeEvent.contentOffset.y;

		offset = currentOffset;
	};

	return (
		<ScrollView
			style={{ paddingHorizontal: 20, height: "100%" }}
			showsVerticalScrollIndicator={true}
			indicatorStyle={dark ? "white" : "black"}
			onScroll={onScroll}
			scrollToOverflowEnabled={true}
			scrollEventThrottle={32}
			scrollEnabled={false}
		>
			<SignupForm />
		</ScrollView>
	);
};

export default SignUp;
