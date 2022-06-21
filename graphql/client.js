import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStateValue } from "../context/StateProvider";

export const client = () => {
	const [state, dispatch] = useStateValue();

	const httpLink = createHttpLink({
		uri: "https://mavely.top",
	});
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				accept: "application/json",
				"Content-Type": "application/json",
				authorization: state.token ? `Bearer ${state.token}` : "",
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

	return new ApolloClient({
		link: errorLink.concat(authLink.concat(httpLink)),
		cache: new InMemoryCache(),
	});
};
