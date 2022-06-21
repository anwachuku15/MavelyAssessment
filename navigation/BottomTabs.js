import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import MainNavigator from "./MainNavigator";
import AccountNavigator from "./AccountNavigator";

const BottomTabs = () => {
	const Tabs = createBottomTabNavigator();

	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: Colors.purple,
				tabBarInactiveTintColor: "gray",
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Search") {
						iconName = focused ? "md-search" : "md-search-outline";
						return <Ionicons name={iconName} size={size} color={color} />;
					} else if (route.name === "Me") {
						iconName = focused ? "user" : "user-o";
						return <FontAwesome name={iconName} size={size} color={color} />;
					}
				},
			})}
		>
			<Tabs.Screen
				name="Search"
				component={MainNavigator}
				initialParams={{ firstRoute: "Home" }}
			/>
			<Tabs.Screen
				name="Me"
				component={AccountNavigator}
				initialParams={{ firstRoute: "Account" }}
			/>
		</Tabs.Navigator>
	);
};

export default BottomTabs;
