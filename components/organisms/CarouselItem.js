import React from "react";
import { View, Text, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;

const CarouselItem = ({ item }) => (
	<View
		style={{
			width: screenWidth,
			justifyContent: "flex-end",
			alignItems: "center",
			marginBottom: 30,
		}}
	>
		<View
			style={{ marginHorizontal: screenWidth * 0.05, alignItems: "center" }}
		>
			<Text
				style={{
					fontWeight: "bold",
					fontSize: 40,
					marginBottom: 10,
					textAlign: "center",
					color: "white",
				}}
			>
				{item.title}
			</Text>
			<Text
				style={{
					fontSize: 14,
					textAlign: "center",
					color: "white",
					fontWeight: "500",
				}}
			>
				{item.description}
			</Text>
		</View>
	</View>
);

export default CarouselItem;
