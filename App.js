import React, { useCallBack, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Appearance } from "react-native";
import TouchableCmp from "./components/atoms/TouchableCmp";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getProducts } from "./graphql/queries";
import Welcome from "./screens/Onboarding/Welcome";
import OnboardingNavigator from "./navigation/OnboardingNavigator";

export default function App() {
	// TODO: Set up Apollo Client
	const client = new ApolloClient({
		uri: "https://mavely.top",
		cache: new InMemoryCache(),
	});

	// const httpLink = createHttpLink({
	//   uri: '/graphql'
	// })
	// const authLink = setContext((_, {headers}) => {

	// })

	const [appIsReady, setAppIsReady] = useState(false);

	const RootStack = createStackNavigator();

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<OnboardingNavigator />
			</NavigationContainer>
			{/* <View style={styles.container}>
				<Welcome />
				<StatusBar style="light" />
			</View> */}
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
