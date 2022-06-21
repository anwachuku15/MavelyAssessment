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
import CategoryList from "../../components/organisms/CategoryList";
import ListItem from "../../components/molecules/ListItem";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../../graphql/queries";

const ResultsScreen = ({ route }) => {
	const { _searchInput } = route.params;
	const [searchInput, setSearchInput] = useState("");
	const [{ searchResults, queryInput }, dispatch] = useStateValue();
	const [after, setAfter] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [searchProducts, { data, loading, error, fetchMore }] =
		useLazyQuery(SEARCH_PRODUCTS);

	const { colors } = useTheme();

	const navigation = useNavigation();

	useEffect(() => {
		setSearchInput(queryInput);
		navigation.addListener("beforeRemove", (e) => {
			dispatch({
				type: "CLEAR_RESULTS",
			});
		});
		// return () => {
		// 	dispatch({
		// 		type: "CLEAR_RESULTS",
		// 	});
		// };
	});

	const onChangeText = async (value) => {
		setSearchInput(value);
		if (value.length > 3) {
			// TODO: getCategories & getBrands
		}
	};

	const overlayOpacity = useSharedValue(0);
	const zIndex = useSharedValue(0);

	const productListOpacity = useSharedValue(1);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			opacity: overlayOpacity.value,
			zIndex: zIndex.value,
		};
	});

	const animatedListStyle = useAnimatedStyle(() => {
		return {
			opacity: productListOpacity.value,
		};
	});

	const onFocus = () => {
		overlayOpacity.value = withTiming(1, {
			duration: 1000,
			easing: Easing.out(Easing.exp),
		});
		productListOpacity.value = withTiming(0, {
			duration: 1000,
			easing: Easing.out(Easing.exp),
		});
		zIndex.value = 10;
	};

	const onBlur = () => {
		productListOpacity.value = withTiming(1, {
			duration: 1500,
			easing: Easing.out(Easing.exp),
		});
		overlayOpacity.value = withTiming(0, {
			duration: 500,
			easing: Easing.out(Easing.exp),
		});
		zIndex.value = 0;
	};

	const onSubmitEditing = async () => {
		try {
			setIsLoading(true);
			searchProducts({
				variables: { where: { name_contains: searchInput } },
			}).then((res) => {
				if (res.data.products.pageInfo.hasNextPage) {
					setAfter(res.data.products.pageInfo.endCursor);
				}
				dispatch({
					type: "FETCH",
					searchResults: res.data.products.edges,
				});
				navigation.navigate("ResultsScreen", {
					searchInput: searchInput,
				});
				setIsLoading(false);
			});
		} catch (err) {
			console.log(err);
		}
	};
	const onUpdate = (prevResult, { fetchMoreResult }) => {
		if (!fetchMoreResult || fetchMoreResult.products.edges.length === 0) {
			return prevResult;
		}
		// console.log("prevResult:", prevResult.products.edges.length);
		// console.log(
		// 	"newResults:",
		// 	prevResult.products.edges.concat(fetchMoreResult.products.edges).length
		// );
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
		// TODO: FETCH MORE APOLLO METHOD
		if (after) {
			console.log(searchInput);
			const moreData = await fetchMore({
				variables: {
					where: { name_contains: searchInput },
					after: after,
				},
				updateQuery: onUpdate,
			});
			if (moreData.data.products.pageInfo.hasNextPage) {
				setAfter(moreData.data.products.pageInfo.endCursor);
			} else {
				setAfter(null);
			}
			// console.log(moreData.data.products.edges);
			// const newData = [...searchResults, ...moreData.data.products.edges];
			// console.log(newData.length);
			setIsLoading(true);
			dispatch({
				type: "FETCH",
				searchResults: res.data.products.edges,
			});
			// setSearchResults([...searchResults, ...moreData.data.products.edges]);
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

	if (!searchInput) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Colors.purple} />
			</View>
		);
	}
	return (
		<>
			{!searchInput ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size="large" color={Colors.purple} />
				</View>
			) : (
				<>
					<View style={{ zIndex: 100 }}>
						<SearchBar
							onFocus={onFocus}
							onBlur={onBlur}
							searchInput={searchInput}
							onChangeText={onChangeText}
							onSubmitEditing={onSubmitEditing}
						/>
					</View>
					<Animated.View style={[animatedListStyle, { flex: 1, zIndex: 7 }]}>
						<FlatList
							ListHeaderComponent={() => <View style={{ marginTop: 10 }} />}
							renderItem={_renderItem}
							data={searchResults}
							// data={data.products.edges}
							onEndReached={onEndReached}
							onEndReachedThreshold={0.5}
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
					<Animated.View
						style={[
							styles.overlayView,
							animatedStyles,
							{ backgroundColor: colors.background },
						]}
					>
						{searchInput.trim().length < 1 ? (
							<View style={styles.svgContainer}>
								<View style={styles.svg}>
									<SearchSVG />
								</View>
								<Text style={[styles.overlayText, { color: colors.text }]}>
									Enter a few words {"\n"}
									to search on Mavely
								</Text>
							</View>
						) : (
							<View style={styles.svgContainer}>
								<View style={styles.svg}>
									<SearchSVG />
								</View>
								<Text style={[styles.overlayText, { color: colors.text }]}>
									{searchInput}
								</Text>
							</View>
						)}
					</Animated.View>
				</>
			)}
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

export default ResultsScreen;
