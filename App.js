import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import OnboardingNavigator from "./navigation/OnboardingNavigator";
import Colors from "./constants/Colors";
import LoadingScreen from "./screens/LoadingScreen";
import { enableScreens } from "react-native-screens";
import BottomTabs from "./navigation/BottomTabs";
import { startNetworkLogging } from "react-native-network-logger";
import * as SecureStore from "expo-secure-store";

import { initialState, reducer } from "./context/reducer";
import { StateProvider, useStateValue } from "./context/StateProvider";

// import { client } from "./graphql/client";

export default function App() {
	startNetworkLogging();
	enableScreens();

	const scheme = useColorScheme();

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

	// TODO: TEST AUTH FLOW;
	// const [state, dispatch] = useStateValue();
	const [token, setToken] = useState();

	const httpLink = createHttpLink({
		uri: "https://mavely.top",
	});
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				accept: "application/json",
				"Content-Type": "application/json",
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});
	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
			graphQLErrors.forEach(({ message, locations, path }) => {
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				);
				console.log(locations);
				console.log(path);
			});

		if (networkError) console.log(`[Network error]: ${networkError}`);
	});

	const client = new ApolloClient({
		link: errorLink.concat(authLink.concat(httpLink)),
		cache: new InMemoryCache({
			// custom merge function to append new query results to existing cache data
			typePolicies: {
				Products: {
					fields: {
						products: {
							keyArgs: false,
							merge(existing = [], incoming) {
								return [...existing, ...incoming];
							},
						},
					},
				},
			},
		}),
	});

	const AppNavigator = () => {
		const [{ isLoading, token }, dispatch] = useStateValue();

		const logout = async () => {
			try {
				await SecureStore.deleteItemAsync("user");
				dispatch({
					type: "LOGOUT",
				});
				client.resetStore();
			} catch (err) {
				console.log(err);
			}
		};
		console.log(token);

		return isLoading ? (
			<LoadingScreen setToken={setToken} />
		) : token ? (
			<BottomTabs />
		) : (
			<OnboardingNavigator />
		);
	};

	// TODO: LOADING CACHE
	// const [loadingCache, setLoadingCache] = useState(true);

	// useEffect(() => {
	// 	persistCache({
	// 		cache,
	// 		storage: AsyncStorage,
	// 	}).then(() => setLoadingCache(false));
	// }, []);

	// if (loadingCache) {
	// 	return <AppLoading />;
	// }

	return (
		<ApolloProvider client={client}>
			<StateProvider initialState={initialState} reducer={reducer}>
				<StatusBar style="auto" />
				<NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
					<AppNavigator />
				</NavigationContainer>
			</StateProvider>
		</ApolloProvider>
	);
}
