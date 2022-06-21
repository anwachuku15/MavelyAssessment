import React, { useMemo, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableWithoutFeedback,
	StyleSheet,
	Image,
	useWindowDimensions,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries";
import ProductListItem from "../molecules/ProductListItem";
import ProductData from "../../constants/ProductData";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import ListItem from "../molecules/ListItem";

const ProductList = ({ data, loading }) => {
	// const { data, loading, error, variables, previousData } =
	// 	useQuery(GET_PRODUCTS);

	const { text } = useTheme().colors;
	const navigation = useNavigation();

	const onPress = (item) => {
		console.log(item.node);
		navigation.navigate("ProductDetail", {
			item,
		});
	};

	const renderItem = ({ item, index }) => {
		// const [isFavorited, setIsFavorite] = useState(false);
		return (
			<TouchableWithoutFeedback onPress={() => onPress(item)}>
				<SharedElement id="sharedElement" style={styles.container}>
					<View>
						{/* <TouchableWithoutFeedback style={styles.wishlistIconWrapper}>
							<FontAwesome
								name={isFavorited ? "heart" : "heart-o"}
								size={24}
								color="black"
								style={styles.wishlistIcon}
							/>
						</TouchableWithoutFeedback> */}
						<SharedElement id={item.node.id} style={styles.productImage}>
							<Image
								source={{
									uri: item.node.image
										? item.node.image.src
										: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-768x768.jpg",
								}}
								resizeMode="cover"
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</SharedElement>
						<SharedElement id="productInfo" style={styles.productInfo}>
							<Text style={[styles.productBrand, { color: text }]}>
								{item.node.brandName}
							</Text>
							<Text
								style={[styles.productName, { color: text }]}
								numberOfLines={2}
							>
								{item.node.name}
							</Text>
						</SharedElement>
					</View>
				</SharedElement>
			</TouchableWithoutFeedback>
		);
	};

	const _renderItem = ({ item }) => (
		<ListItem item={item} styles={styles} text={text} onPress={onPress} />
	);

	return (
		<FlatList
			ListHeaderComponent={() => <View style={{ marginTop: 10 }} />}
			numColumns={2}
			renderItem={_renderItem}
			data={data}
			style={{ flex: 1 }}
			keyExtractor={(_, index) => index.toString()}
			columnWrapperStyle={{
				justifyContent: "space-evenly",
				height: useWindowDimensions().height * 0.3,
			}}
		/>
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
		// borderRadius: 50,
		// overflow: "hidden",
	},
	productInfo: {
		height: "15%",
	},
	productBrand: {
		fontWeight: "bold",
	},
	wishlistIconWrapper: {
		zIndex: 9,
		width: "100%",
		position: "absolute",
		// top: 24,
	},
	wishlistIcon: {
		position: "absolute",
		right: 0,
	},
});

export default ProductList;
