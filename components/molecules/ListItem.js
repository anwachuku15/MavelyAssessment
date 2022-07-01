import React, { memo, useEffect, useState } from "react";
import {
	TouchableWithoutFeedback,
	View,
	Image,
	Text,
	ActivityIndicator,
	Animated,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

const ListItem = ({ item, styles, text, onPress }) => {
	const [isError, setIsError] = useState(false);
	const [opacity, setOpacity] = useState(new Animated.Value(0));
	const onLoad = () => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};
	return (
		<TouchableWithoutFeedback onPress={() => onPress(item)}>
			<SharedElement id="sharedElement" style={styles.container}>
				<View>
					<SharedElement
						id={item.id ? item.id : item.node.id}
						style={styles.productImage}
					>
						{item.thumbnail ? (
							<Animated.Image
								onLoad={onLoad}
								source={{ uri: item.thumbnail }}
								resizeMode="cover"
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 10,
									opacity: opacity,
									transform: [
										{
											scale: opacity.interpolate({
												inputRange: [0, 1],
												outputRange: [0.85, 1],
											}),
										},
									],
								}}
							/>
						) : (
							<Image
								defaultSource={require("../../assets/noimage.png")}
								source={
									item.node.image
										? { uri: item.node.image.src }
										: require("../../assets/noimage.png")
								}
								onError={(e) => {
									setIsError(true);
								}}
								resizeMode={isError || !item.node.image ? "contain" : "cover"}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 10,
								}}
							/>
						)}
					</SharedElement>
					<SharedElement id="productInfo" style={styles.productInfo}>
						<Text
							style={[styles.productBrand, { color: text }]}
							numberOfLines={1}
						>
							{item.node ? item.node.brandName : item.brandName}
						</Text>
						<Text
							style={[styles.productName, { color: text }]}
							numberOfLines={1}
						>
							{item.node ? item.node.name : item.name}
						</Text>
					</SharedElement>
				</View>
			</SharedElement>
		</TouchableWithoutFeedback>
	);
};

export default memo(ListItem);
