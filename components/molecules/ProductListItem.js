import React, { createRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";

// import { SharedElement } from "react-navigation-shared-element";
import {
	SharedElement,
	SharedElementTransition,
	nodeFromRef,
} from "react-native-shared-element";

const ProductListItem = ({ item, onPress }) => {
	// const container = createRef();

	return (
		<TouchableWithoutFeedback onPress={() => onPress(item)}>
			<SharedElement id="productDetail" style={styles.container}>
				<View>
					<SharedElement id={item.node.image.src} style={styles.productImage}>
						<Image
							source={{
								uri: item.node.image.src,
							}}
							resizeMode="contain"
							style={{ width: "100%", height: "100%" }}
						/>
					</SharedElement>
					<SharedElement id="productInfo" style={styles.productInfo}>
						<Text style={styles.productBrand}>{item.node.brandName}</Text>
						<Text style={styles.productName} numberOfLines={2}>
							{item.node.name}
						</Text>
					</SharedElement>
				</View>
			</SharedElement>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "45%",
		// height: screenHeight * 0.3,
	},
	productImage: {
		height: "85%",
		width: "100%",
	},
	productInfo: {
		height: "15%",
	},
	productBrand: {
		fontWeight: "bold",
	},
});

export default ProductListItem;
