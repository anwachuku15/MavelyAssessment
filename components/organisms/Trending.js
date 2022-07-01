import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	ImageBackground,
	Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_TRENDING } from "../../graphql/queries";
import Colors from "../../constants/Colors";
import ListItem from "../molecules/ListItem";

const Trending = () => {
	// const { data, loading, error } = useQuery(GET_CATEGORIES);
	const { data, loading, error } = useQuery(GET_TRENDING);
	const { text } = useTheme().colors;
	useEffect(() => {
		// console.log(data?.trendingProducts.length);
	});

	const navigation = useNavigation();
	const onPress = (item) => {
		// console.log(item);
		navigation.navigate("ProductDetail", { item });
	};
	const renderItem = ({ item }) => (
		<TouchableWithoutFeedback onPress={() => onPress(item)}>
			<View style={styles.item}>
				<ImageBackground
					style={{
						width: "100%",
						height: "100%",
						alignItems: "center",
						justifyContent: "center",
					}}
					resizeMode="cover"
					source={
						item.image !== ""
							? {
									uri: item.image,
							  }
							: require("../../assets/mavelylogo.png")
					}
					blurRadius={item.image === "" ? 6 : 1}
				>
					<View
						style={{
							// position: "absolute",
							zIndex: 9,
							alignSelf: "center",
							// justifyContent: "center",
							// top: 10,
						}}
					>
						<Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
							{/* {item.name !== "New Arrivals" ? item.name : ""} */}
							{item.name}
						</Text>
					</View>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);

	const _renderItem = ({ item }) => (
		<ListItem item={item} text={text} styles={styles} onPress={onPress} />
	);

	// if (loading) {
	// 	return (
	// 		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	// 			<ActivityIndicator size="large" color={Colors.purple} />
	// 		</View>
	// 	);
	// }

	const viewConfigRef = useRef({ itemVisiblePercentThreshold: 75 });
	const onViewRef = useRef((viewableItems, change) => {
		const visibleItems = viewableItems.viewableItems;
		let visibleFeedIds = [];
		visibleItems.forEach((item) => {
			const key = item.key;
			visibleFeedIds.push(key);
		});
	});
	return (
		<FlatList
			style={{ flex: 1 / 2 }}
			columnWrapperStyle={{
				justifyContent: "space-evenly",
				height: Dimensions.get("screen").height * 0.3,
				marginBottom: 10,
			}}
			numColumns={2}
			data={data && data.trendingProducts}
			keyExtractor={(_, index) => index.toString()}
			renderItem={_renderItem}
			ListHeaderComponent={() => (
				<Text style={{ color: text, fontWeight: "bold", textAlign: "center" }}>
					TRENDING
				</Text>
				// <View style={styles.categoriesBtn}>
				// 	<Text style={{ color: text }}>CATEGORIES</Text>
				// </View>
			)}
			onViewableItemsChanged={onViewRef.current}
			viewabilityConfig={viewConfigRef.current}
		/>
	);
};

const styles = StyleSheet.create({
	item: {
		// flex: 1,
		width: "48%",
		height: 50,
		backgroundColor: "lightgray",
		borderRadius: 10,
		overflow: "hidden",
		marginVertical: 5,
		alignItems: "center",
		// justifyContent: "center",
	},
	categoriesBtn: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "gray",
		borderWidth: 1,
	},
	overlayView: {
		position: "absolute",
		height: Dimensions.get("screen").height,
		width: Dimensions.get("screen").width,
	},
	svgContainer: {
		flex: 1,
		flexDirection: "column",
		marginTop: "30%",
		top: -20,
	},
	svg: {
		height: "30%",
		width: "70%",
		alignSelf: "center",
	},
	imgPlaceholder: {
		width: 150,
		height: 113,
		alignSelf: "center",
	},
	overlayText: {
		textAlign: "center",
		color: "gray",
		marginTop: 5,
	},

	container: {
		width: "45%",
		// height: Dimensions.get("screen").height * 0.3,
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

export default Trending;
