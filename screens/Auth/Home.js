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
import SearchBar from "../../components/molecules/SearchBar";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Header, getDefaultHeaderHeight } from "@react-navigation/elements";

import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import SearchSVG from "../../components/atoms/SearchSVG";

import Colors from "../../constants/Colors";
import { SIGN_UP } from "../../graphql/mutations";
import { useStateValue } from "../../context/StateProvider";
import Trending from "../../components/organisms/Trending";
import ListItem from "../../components/molecules/ListItem";

const Home = () => {
	const navigation = useNavigation();
	const { colors, dark } = useTheme();

	const [searchInput, setSearchInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [searchProducts, { data, loading, error, fetchMore }] =
		useLazyQuery(SEARCH_PRODUCTS);

	const [state, dispatch] = useStateValue();

	const onChangeText = async (value) => {
		setSearchInput(value);
	};

	let _results = [];
	let newProducts;

	const searchRef = useRef();

	const onSubmitEditing = async () => {
		try {
			setIsLoading(true);
			searchProducts({
				variables: { where: { name_contains: searchInput } },
			}).then((res) => {
				if (res.data.products.pageInfo.hasNextPage) {
					dispatch({
						type: "SET_AFTER",
						after: res.data.products.pageInfo.endCursor,
					});
				}
				dispatch({
					type: "FETCH",
					searchResults: res.data.products.edges,
					queryInput: searchInput.trim().length > 0 ? searchInput : "",
				});

				navigation.navigate("ResultsScreen", {
					_searchInput: searchInput,
					results: res.data.products.edges,
				});
				setIsLoading(false);
				searchRef.current.clear();
			});
		} catch (err) {
			console.log(err);
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

	return (
		<>
			<View style={{ zIndex: 100 }}>
				<SearchBar
					searchRef={searchRef}
					onFocus={onFocus}
					onBlur={onBlur}
					searchInput={searchInput}
					onChangeText={onChangeText}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
			<Animated.View style={[{ flex: 1, zIndex: 7 }]}>
				<Trending />
			</Animated.View>
			<Animated.View
				style={[
					styles.overlayView,
					animatedStyles,
					{ backgroundColor: colors.background },
				]}
			>
				{isLoading ? (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<ActivityIndicator size="large" color={Colors.purple} />
					</View>
				) : searchInput.trim().length < 1 ? (
					<View style={styles.svgContainer}>
						<View style={styles.svg}>
							<SearchSVG />
						</View>
						<Text style={[styles.overlayText, { color: colors.text }]}>
							Search Mavely
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
});
export default Home;
