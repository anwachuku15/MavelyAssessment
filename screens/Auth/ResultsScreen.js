import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
	ActivityIndicator,
} from "react-native";
import SearchSVG from "../../components/atoms/SearchSVG";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useNavigation, useTheme } from "@react-navigation/native";
import SearchBar from "../../components/molecules/SearchBar";
import { useStateValue } from "../../context/StateProvider";
import Colors from "../../constants/Colors";
import CategoryList from "../../components/organisms/Trending";
import ListItem from "../../components/molecules/ListItem";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../../graphql/queries";

const ResultsScreen = ({ route }) => {
	const { _searchInput } = route.params;
	const [{ searchResults, queryInput, after }, dispatch] = useStateValue();
	const [searchInput, setSearchInput] = useState(_searchInput);

	const [isLoading, setIsLoading] = useState(false);

	const { colors } = useTheme();

	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener("beforeRemove", (e) => {
			dispatch({
				type: "CLEAR_RESULTS",
			});
		});
	}, []);

	const productListOpacity = useSharedValue(1);

	const animatedListStyle = useAnimatedStyle(() => {
		return {
			opacity: productListOpacity.value,
		};
	});

	const onUpdate = (prevResult, { fetchMoreResult }) => {
		if (!fetchMoreResult || fetchMoreResult.products.edges.length === 0) {
			return prevResult;
		}
		console.log("prevResult:", prevResult.products.edges.length);

		return {
			products: {
				edges: prevResult.products.edges.concat(fetchMoreResult.products.edges),
				pageInfo: {
					hasNextPage: fetchMoreResult.products.pageInfo.hasNextPage,
					endCursor: fetchMoreResult.products.pageInfo.endCursor,
				},
				aggregate: {
					count: fetchMoreResult.products.aggregate.count,
				},
			},
		};
	};
	const onEndReached = async () => {
		console.log("onEndReached");
		if (after) {
			const moreData = await fetchMore({
				variables: {
					where: { name_contains: searchInput },
					after: after,
				},
				updateQuery: onUpdate,
			});
			if (moreData.data.products.pageInfo.hasNextPage) {
				dispatch({
					type: "SET_AFTER",
					after: moreData.data.products.pageInfo.endCursor,
				});
			} else {
				dispatch({
					type: "SET_AFTER",
					after: null,
				});
			}
			setIsLoading(true);
			dispatch({
				type: "FETCH",
				searchResults: moreData.data.products.edges,
			});
			setIsLoading(false);
		}
	};

	const viewConfigRef = useRef({ itemVisiblePercentThreshold: 75 });
	const onViewRef = useRef((viewableItems, change) => {
		const visibleItems = viewableItems.viewableItems;
		let visibleFeedIds = [];
		visibleItems.forEach((item) => {
			const key = item.key;
			visibleFeedIds.push(key);
		});
	});
	const onPress = (item) => {
		console.log(item.node);
		navigation.navigate("ProductDetail", { item });
	};
	const _renderItem = ({ item, _ }) => (
		<ListItem
			item={item}
			text={colors.text}
			styles={styles}
			onPress={onPress}
		/>
	);

	const ListFooterComponent = () => {
		return isLoading ? (
			<ActivityIndicator
				style={{ alignItems: "center", justifyContent: "center" }}
				size="large"
				color={Colors.purple}
			/>
		) : (
			<></>
		);
	};

	return (
		<>
			<>
				<Animated.View style={[animatedListStyle, { flex: 1, zIndex: 7 }]}>
					<FlatList
						ListHeaderComponent={() => <View style={{ marginTop: 10 }} />}
						renderItem={_renderItem}
						data={searchResults}
						onEndReached={onEndReached}
						onEndReachedThreshold={2}
						onViewableItemsChanged={onViewRef.current}
						viewabilityConfig={viewConfigRef.current}
						style={{ flex: 1 / 2 }}
						keyExtractor={(_, index) => index.toString()}
						numColumns={2}
						columnWrapperStyle={{
							justifyContent: "space-evenly",
							height: Dimensions.get("screen").height * 0.3,
						}}
						ListFooterComponentListFooterComponent={ListFooterComponent}
					/>
				</Animated.View>
			</>
		</>
	);
};

const styles = StyleSheet.create({
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

export default ResultsScreen;
