import React from "react";
import { View, Text } from "react-native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "../screens/Auth/Home";
import ProductDetail from "../screens/Auth/ProductDetail";
import Colors from "../constants/Colors";
import SearchScreen from "../screens/Auth/SearchScreen";
import ResultsScreen from "../screens/Auth/ResultsScreen";

const MainStack = createSharedElementStackNavigator();

const MainNavigator = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerTintColor: Colors.purple,
				// headerTransparent: true,
			}}
		>
			<MainStack.Screen name="Home" component={Home} />
			<MainStack.Screen
				name="ProductDetail"
				component={ProductDetail}
				sharedElements={(route, otherRoute, showing) => {
					const { item } = route.params;
					return [
						{
							id: `${item.node ? item.node.id : item.id}`,
							animation: "move",
							resize: "clip",
							align: "auto",
						},
					];
				}}
				options={({ route, navigation }) => ({
					cardStyleInterpolator: ({ current: { progress } }) => {
						return {
							cardStyle: {
								opacity: progress,
							},
						};
					},
					headerTitle: `${
						route.params.item.node
							? route.params.item.node.name
							: route.params.item.name
					}`,
				})}
			/>
			<MainStack.Screen
				name="SearchScreen"
				component={SearchScreen}
				options={({ route, navigation }) => ({
					cardStyleInterpolator: ({ current: { progress } }) => {
						return {
							cardStyle: {
								opacity: progress,
							},
						};
					},
				})}
			/>
			<MainStack.Screen
				name="ResultsScreen"
				component={ResultsScreen}
				options={({ route, navigation }) => ({
					headerTitle:
						route.params._searchInput === ""
							? "All Products"
							: `Results for ${route.params._searchInput}`,
				})}
			/>
		</MainStack.Navigator>
	);
};

export default MainNavigator;
