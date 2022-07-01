import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { useHeaderHeight } from "@react-navigation/elements";
const ProductDetail = ({ route, otherRoute, showing }) => {
	const { item } = route.params;
	const { text } = useTheme().colors;

	const [img, setImg] = useState({ uri: item.node?.image?.src });
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<SharedElement
				id={item.id ? item.id : item.node.id}
				style={{ width: "100%", height: 400 }}
			>
				<Image
					source={
						item.id
							? { uri: item.thumbnail }
							: item.node.image
							? img
							: require("../../assets/noimage.png")
					}
					// source={item.node.image ? img : require("../../assets/noimage.png")}
					onError={(e) => {
						// console.log(e.nativeEvent.error);
						setImg(require("../../assets/noimage.png"));
					}}
					resizeMode="contain"
					style={{ width: "100%", height: "100%" }}
				/>
			</SharedElement>
			<Text style={[styles.brandName, { color: text }]}>
				{item.node ? item.node.brandName : item.brandName}
			</Text>
			<Text style={[styles.productName, { color: text }]}>
				{item.node ? item.node.name : item.name}
			</Text>
			<View style={styles.description}>
				<Text style={{ color: text }}>
					{item.node ? item.node.description : item.description}
				</Text>
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
