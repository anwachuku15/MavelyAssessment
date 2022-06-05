import React, { useCallBack, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import TouchableCmp from "./components/atoms/TouchableCmp";
import * as SplashScreen from "expo-splash-screen";

import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
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
import Colors from "./constants/Colors";

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

	const darkTheme = {
		dark: true,
		colors: {
			...DarkTheme.colors,
			primary: Colors.purple,
		},
	};

	const lightTheme = {
		dark: false,
		colors: {
			...DefaultTheme.colors,
			primary: Colors.purple,
		},
	};

	const scheme = useColorScheme();

	return (
		<ApolloProvider client={client}>
			<StatusBar style="auto" />
			<NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
				<OnboardingNavigator />
			</NavigationContainer>
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
