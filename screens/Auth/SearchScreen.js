import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import SearchBar from "../../components/molecules/SearchBar";
// import { SearchBar } from "react-native-screens";
import { HeaderBackButton } from "@react-navigation/elements";

const SearchScreen = () => {
	const { text } = useTheme().colors;
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => {
				return (
					<SafeAreaView style={{ flexDirection: "row" }}>
						<SearchBar />
					</SafeAreaView>
				);
			},
		});
	});
	return (
		<View>
			<Text style={{ color: text }}>SearchScreen</Text>
		</View>
	);
};

export default SearchScreen;
