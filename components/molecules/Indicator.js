import { View, Text, Dimensions, Animated } from "react-native";
import React from "react";
import { welcomeData } from "../../constants/CarouselData";
import { useTheme } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("screen");
const Indicator = ({ scrollX }) => {
	const { dark, colors } = useTheme();
	return (
		<View style={{ flexDirection: "row", position: "absolute", bottom: 50 }}>
			{welcomeData.map((_, i) => {
				// prevSlide, currSlide, nextSlide
				const inputRange = [
					(i - 1) * screenWidth,
					i * screenWidth,
					(i + 1) * screenWidth,
				];

				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.8, 1.4, 0.8],
					extrapolate: "clamp",
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.6, 0.9, 0.6],
					extrapolate: "clamp",
				});
				const backgroundColor = dark
					? scrollX.interpolate({
							inputRange,
							outputRange: ["#999", "white", "#999"],
							extrapolate: "clamp",
					  })
					: scrollX.interpolate({
							inputRange,
							outputRange: [
								"rgba(114, 121, 238, 0.8)",
								colors.primary,
								"rgba(114, 121, 238, 0.8)",
							],
							extrapolate: "clamp",
					  });

				return (
					<Animated.View
						key={`indicator-${i}`}
						style={{
							height: 10,
							width: 10,
							borderRadius: 5,
							margin: 10,
							backgroundColor,
							opacity,
							transform: [
								{
									scale,
								},
							],
						}}
					/>
				);
			})}
		</View>
	);
};

export default Indicator;
