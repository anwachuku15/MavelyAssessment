import React, {
	useEffect,
	useLayoutEffect,
	useState,
	forwardRef,
	createRef,
	useRef,
	useCallback,
} from "react";
import {
	View,
	Text,
	FlatList,
	SafeAreaView,
	Dimensions,
	StyleSheet,
	Image,
	useWindowDimensions,
	ActivityIndicator,
} from "react-native";
import TouchableCmp from "../../components/atoms/TouchableCmp";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS, SEARCH_PRODUCTS } from "../../graphql/queries";
import ProductListItem from "../../components/molecules/ProductListItem";
import ProductList from "../../components/organisms/ProductList";
import SearchBar from "../../components/molecules/SearchBar";
import { useNavigation, useTheme } from "@react-navigation/native";
// import { Header } from "@react-navigation/stack";
import { Header, getDefaultHeaderHeight } from "@react-navigation/elements";

import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import SearchSVG from "../../components/atoms/SearchSVG";

// import { Tab, TabView } from "@rneui/themed";
import Colors from "../../constants/Colors";
import { SIGN_UP } from "../../graphql/mutations";
import { useStateValue } from "../../context/StateProvider";
import Trending from "../../components/organisms/Trending";
import ListItem from "../../components/molecules/ListItem";
// import { client } from "../../graphql/client";

const sWidth = Dimensions.get("screen").width;

const tabs = [
	{ title: "All", ref: createRef() },
	{ title: "Category", ref: createRef() },
	{ title: "Brand", ref: createRef() },
];
const data = ["hello", "young", "world"];

const Tab = forwardRef(({ tab, onTabPress }, ref) => (
	<TouchableCmp onPress={onTabPress} style={{ width: "33%" }}>
		<View
			ref={ref}
			style={{
				flexDirection: "row",
				paddingVertical: 10,
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<View>
				<Text style={{ fontSize: 12, fontWeight: "700", color: Colors.purple }}>
					{tab.title}
				</Text>
			</View>
		</View>
	</TouchableCmp>
));

const Tabs = ({ tabs, scrollX, onTabPress }) => {
	const [tabOptions, setTabOptions] = useState([]);
	const tabsContainerRef = useRef();

	useEffect(() => {
		let options = [];
		tabs.forEach((tab) => {
			tab.ref.current.measureLayout(tabsContainerRef.current, (x) => {
				options.push({
					x: x,
				});
				if (options.length === tabs.length) {
					setTabOptions(options);
				}
			});
		});
	}, []);

	return (
		<View
			ref={tabsContainerRef}
			style={{
				alignSelf: "center",
				marginTop: 10,
				width: sWidth / 1.1,
				// backgroundColor: Colors.purple,
			}}
		>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						tab={tab}
						ref={tab.ref}
						scrollX={scrollX}
						onTabPress={() => onTabPress(index)}
					/>
				))}
			</View>
			{tabOptions.length > 0 && (
				<Indicator tabOptions={tabOptions} scrollX={scrollX} />
			)}
		</View>
	);
};

const Indicator = ({ tabOptions, scrollX }) => {
	const width = sWidth / 1.1;
	const inputRange = data.map((_, i) => i * width);
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: tabOptions.map((option) => option.x),
	});
	return (
		<Animated.View
			style={{
				width: sWidth / 3,
				height: 4,
				backgroundColor: Colors.blue,
				position: "absolute",
				bottom: 0,
				left: 0,
				transform: [
					{
						translateX: translateX,
					},
				],
			}}
		/>
	);
};

const Home = () => {
	// const { loading, error, data, client } = useQuery(GET_PRODUCTS);
	// TODO: onEndReached (offset by a little)
	// Fetch 25 and then next 25

	// DEMO PRODUCT
	const navigation = useNavigation();
	const { colors, dark } = useTheme();

	const [searchInput, setSearchInput] = useState("");
	// const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [after, setAfter] = useState();
	const [tempResults, setTempResults] = useState([]);
	const [skip, setSkip] = useState(0);

	// const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
	const [searchProducts, { data, loading, error, fetchMore }] =
		useLazyQuery(SEARCH_PRODUCTS);

	const [{ searchResults }, dispatch] = useStateValue();

	const onChangeText = async (value) => {
		setSearchInput(value);
		if (value.length > 3) {
			// TODO: getCategories & getBrands
		}
	};

	let _results = [];
	let newProducts;
	const onSubmitEditing = async () => {
		// TODO: IF searchInput.trim().length === 0
		try {
			setIsLoading(true);
			searchProducts({
				variables: { where: { name_contains: searchInput } },
			}).then((res) => {
				if (res.data.products.pageInfo.hasNextPage) {
					setAfter(res.data.products.pageInfo.endCursor);
					dispatch({
						type: "SET_AFTER",
						after: res.data.products.pageInfo.endCursor,
					});
				}
				console.log(res.data.products.edges.length);
				dispatch({
					type: "FETCH",
					searchResults: res.data.products.edges,
					queryInput: searchInput.trim().length > 0 ? searchInput : "",
				});
				navigation.navigate("ResultsScreen", {
					_searchInput: searchInput,
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
			setIsLoading(true);
			dispatch({
				type: "FETCH",
				searchResults: res.data.products.edges,
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
	const onPress = (item, imageError) => {
		console.log(imageError);
		// navigation.navigate("ProductDetail", { item, imageError: imageError });
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
			/>
		) : (
			<></>
		);
	};

	const ResultList = () => {
		return (
			<FlatList
				ListHeaderComponent={() => <View style={{ marginTop: 10 }} />}
				renderItem={_renderItem}
				data={searchResults}
				onEndReached={onEndReached}
				onEndReachedThreshold={0}
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
		);
	};

	// ANIMATED STUFF
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

	const scrollX = useRef(new Animated.Value(0)).current;
	const ref = useRef();
	const onTabPress = useCallback((tabIndex) => {
		ref?.current?.scrollToOffset({
			offset: tabIndex * sWidth,
		});
	});
	const [showTabs, setShowTabs] = useState(false);

	useLayoutEffect(() => {
		// setShowTabs(true);
	});

	return (
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

			{/* {searchInput.trim().length > 0 && (
				<View
					style={{
						zIndex: 999,
						width: "100%",
					}}
				>
					<Tabs tabs={tabs} scrollX={scrollX} onTabPress={onTabPress} />
				</View>
			)} */}
			<Animated.View style={[animatedListStyle, { flex: 1, zIndex: 7 }]}>
				{/* {searchResults.length > 0 ? (
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
				) : (
					!showResults && <CategoryList />
				)} */}
				<Trending />
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
export default Home;
