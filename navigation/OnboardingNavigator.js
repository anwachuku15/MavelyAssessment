import React from "react";
import { View, Dimensions } from "react-native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import Welcome from "../screens/Onboarding/Welcome";
import Login from "../screens/Onboarding/Login";
import SignUp from "../screens/Onboarding/SignUp";
import Network from "../screens/Network";

const screenHeight = Dimensions.get("screen").height;

const OnboardingNavigator = () => {
	const OnboardingStack = createStackNavigator();

	return (
		<OnboardingStack.Navigator screenOptions={() => ({ headerShown: false })}>
			<OnboardingStack.Screen
				name="Welcome"
				component={Welcome}
				options={{ headerShown: false }}
			/>
			<OnboardingStack.Screen
				name="Login"
				component={Login}
				options={() => ({
					...TransitionPresets.ModalPresentationIOS,
					// TODO: Conditional gesture based on ScrollView
					gestureResponseDistance: screenHeight,
				})}
			/>
			<OnboardingStack.Screen
				name="SignUp"
				component={SignUp}
				options={() => ({
					...TransitionPresets.ModalPresentationIOS,
					// TODO: Conditional gesture based on ScrollView
					gestureResponseDistance: screenHeight,
				})}
			/>
			<OnboardingStack.Screen
				name="NetworkLogger"
				component={Network}
				options={() => ({
					...TransitionPresets.ModalPresentationIOS,
					// gestureResponseDistance: screenHeight,
				})}
			/>
		</OnboardingStack.Navigator>
	);
};

export default OnboardingNavigator;
