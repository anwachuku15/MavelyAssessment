import React, { createRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Keyboard,
	TextInput,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SearchBar as SearchInput } from "@rneui/themed";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";
import { GET_PRODUCTS } from "../../graphql/queries";

const SearchBar = ({
	onFocus,
	onBlur,
	searchInput,
	onChangeText,
	onSubmitEditing,
}) => {
	// const [products, {data, loading, error}] = useQuery(GET_PRODUCTS)
	const { colors, dark } = useTheme();

	return (
		<View style={{ padding: 10 }}>
			<SearchInput
				platform={Platform.OS === "ios" && "ios"}
				placeholder="Search products"
				value={searchInput}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				onFocus={onFocus}
				onBlur={onBlur}
				// showSoftInputOnFocus={false}
				round
				// showLoading={loading}
				lightTheme={!dark}
				cancelButtonProps={{ buttonTextStyle: { color: Colors.purple } }}
				containerStyle={{
					zIndex: 999,
					backgroundColor: "transparent",
					padding: 0,
					height: 30,
					width: "100%",
				}}
				inputContainerStyle={{
					height: 30,
					backgroundColor: dark ? Colors.darkInput : "lightgray",
				}}
				inputStyle={{ color: colors.text }}
				returnKeyType="search"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		width: Dimensions.get("screen").width - 20,
		height: 40,
		backgroundColor: "red",
		paddingHorizontal: 10,
		justifyContent: "center",
	},
	content: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
		position: "absolute",
		left: 0,
		bottom: 0,
		zIndex: 1000,
		backgroundColor: "red",
	},
	contentSafeArea: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default SearchBar;
