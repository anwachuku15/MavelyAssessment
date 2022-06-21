import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { useHeaderHeight } from "@react-navigation/elements";
const ProductDetail = ({ route, otherRoute, showing }) => {
	const { item } = route.params;
	const { text } = useTheme().colors;

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<SharedElement id={item.node.id} style={{ width: "100%", height: 400 }}>
				<Image
					source={{
						uri: item.node.image
							? item.node.image.src
							: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-768x768.jpg",
					}}
					resizeMode="contain"
					style={{ width: "100%", height: "100%" }}
				/>
			</SharedElement>
			<Text style={[styles.brandName, { color: text }]}>
				{item.node.brandName}
			</Text>
			<Text style={[styles.productName, { color: text }]}>
				{item.node.name}
			</Text>
			<View style={styles.description}>
				<Text style={{ color: text }}>{item.node.description}</Text>
			</View>
		</ScrollView>
	);
};

// ProductDetail.sharedElements = (route) => {
// 	const { item } = route.params;
// 	return [
// 		{
// 			id: `${item.image.src}`,
// 			animation: "move",
// 			resize: "clip",
// 		},
// 		{
// 			id: "productInfo",
// 			animation: "move",
// 			resize: "clip",
// 		},
// 	];
// };

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		alignItems: "center",
		paddingBottom: 40,
	},
	brandName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	productName: {
		fontSize: 16,
	},
	description: {
		marginVertical: 10,
		marginHorizontal: 15,
	},
});

export default ProductDetail;
