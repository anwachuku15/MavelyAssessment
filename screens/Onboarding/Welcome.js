import React, {
	useRef,
	useState,
	useEffect,
	useCallback,
	createRef,
} from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Animated,
	useColorScheme,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

import LoginButton from "../../components/molecules/LoginButton";
import SignupButton from "../../components/molecules/SignupButton";
import { welcomeData } from "../../constants/CarouselData";
import CarouselItem from "../../components/molecules/CarouselItem";
import Indicator from "../../components/molecules/Indicator";
import { Video, AVPlaybackStatus } from "expo-av";
// import Video from "react-native-video";
import VideoPlayer from "expo-video-player";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import useInterval from "use-interval";
import TouchableCmp from "../../components/atoms/TouchableCmp";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const Welcome = () => {
	const navigation = useNavigation();
	const scheme = useColorScheme();
	const { text } = useTheme().colors;
	const video = useRef(null);

	// Keep track of componenent values so on re-render, values don't change
	const scrollX = useRef(new Animated.Value(0)).current;

	const flatListRef = createRef();
	// const [scrollValue, setScrollValue] = useState(0);
	// const [scrolled, setScrolled] = useState(0);

	// TODO: CLEAR INTERVAL WHEN DRAGGED
	const infiniteScroll = (data) => {
		let scrollValue = 0;
		let scrolled = 0;

		if (flatListRef.current) {
			setInterval(() => {
				scrolled++;
				if (scrolled < data.length) {
					scrollValue = scrollValue + screenWidth;
				} else {
					scrollValue = 0;
					scrolled = 0;
				}

				flatListRef?.current?.scrollToOffset({
					animated: true,
					offset: scrollValue,
				});
			}, 3000);
		}
	};

	useEffect(() => {
		infiniteScroll(welcomeData);
	});

	const renderItem = ({ item }) => {
		return <CarouselItem item={item} text={text} />;
	};

	const gradient =
		scheme === "dark"
			? ["transparent", "transparent", "rgba(0,0,0,0.95)", "rgba(32, 3, 90,1)"]
			: ["transparent", "transparent", "rgba(255,255,255,0.8)", "white"];
	return (
		<View style={styles.container}>
			<Video
				source={require("../../assets/outfit.mp4")}
				style={styles.bgVideo}
				ref={video}
				isLooping
				resizeMode="cover"
				useNativeControls={false}
				isMuted
				rate={1.0}
				shouldPlay
			/>
			<LinearGradient colors={gradient} style={styles.bgVideo} />
			<View style={styles.carouselWrapper}>
				<Animated.FlatList
					ref={flatListRef}
					scrollEventThrottle={32}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
							listener: (event) => {},
						}
					)}
					data={welcomeData}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<View style={styles.buttonsWrapper}>
				<View style={{ width: "33%" }}>
					<LoginButton />
				</View>
				<View style={{ width: "65%" }}>
					<SignupButton />
				</View>
			</View>

			{/* <View>
				<TouchableCmp
					onPress={() => navigation.navigate("NetworkLogger")}
					style={{ width: "40%" }}
				>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 10,
							marginTop: 5,
							height: 40,
							width: 100,
							backgroundColor: "red",
						}}
					>
						<Text style={{ color: "white" }}>NETWORK</Text>
					</View>
				</TouchableCmp>
			</View> */}

			<Indicator scrollX={scrollX} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "space-between",
		alignItems: "center",
	},
	bgVideo: {
		height: screenHeight,
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: "stretch",
		zIndex: 0,
	},
	carouselWrapper: {
		zIndex: 9,
		flex: 0.85,
	},
	buttonsWrapper: {
		width: screenWidth * 0.85,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// flex: 0.22,
	},
	indicator: {
		height: 10,
		borderRadius: 5,
		backgroundColor: "white",
		marginHorizontal: 8,
	},
	blurContainer: {
		flex: 1,
		// justifyContent: "center",
		alignItems: "center",
	},
});

export default Welcome;
