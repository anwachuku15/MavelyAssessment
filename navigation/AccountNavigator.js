import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Auth/Account";

const AccountNavigator = () => {
	const AccountStack = createStackNavigator();
	return (
		<AccountStack.Navigator>
			<AccountStack.Screen name="Account" component={Account} />
		</AccountStack.Navigator>
	);
};

export default AccountNavigator;
