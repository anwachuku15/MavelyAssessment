import React from "react";
import { View, Text, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;

const CarouselItem = ({ item, text }) => {
	return (
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
						color: text,
						fontWeight: "bold",
						fontSize: 40,
						marginBottom: 10,
						textAlign: "center",
					}}
				>
					{item.title}
				</Text>
				<Text
					style={{
						color: text,
						fontSize: 14,
						textAlign: "center",
						fontWeight: "500",
					}}
				>
					{item.description}
				</Text>
			</View>
		</View>
	);
};

export default CarouselItem;
