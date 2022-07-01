import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	StyleSheet,
	Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING } from "../../graphql/queries";
import Colors from "../../constants/Colors";
import ListItem from "../molecules/ListItem";

const Trending = () => {
	const { data, loading, error } = useQuery(GET_TRENDING);
	const { text } = useTheme().colors;

	const navigation = useNavigation();
	const onPress = (item) => {
		navigation.navigate("ProductDetail", { item });
	};

	const _renderItem = ({ item }) => (
		<ListItem item={item} text={text} styles={styles} onPress={onPress} />
	);

	const viewConfigRef = useRef({ itemVisiblePercentThreshold: 75 });
	const onViewRef = useRef((viewableItems, change) => {
		const visibleItems = viewableItems.viewableItems;
		let visibleFeedIds = [];
		visibleItems.forEach((item) => {
			const key = item.key;
			visibleFeedIds.push(key);
		});
	});

	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size="large" color={Colors.purple} />
			</View>
		);
	}
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
				<Text
					style={{
						color: text,
						fontWeight: "bold",
						textAlign: "center",
						fontSize: 24,
						marginBottom: 10,
					}}
				>
					TRENDING
				</Text>
			)}
			onViewableItemsChanged={onViewRef.current}
			viewabilityConfig={viewConfigRef.current}
		/>
	);
};

const styles = StyleSheet.create({
	item: {
		width: "48%",
		height: 50,
		backgroundColor: "lightgray",
		borderRadius: 10,
		overflow: "hidden",
		marginVertical: 5,
		alignItems: "center",
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
