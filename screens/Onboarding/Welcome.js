import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Animated,
	Image,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import LoginButton from "../../components/molecules/LoginButton";
import SignupButton from "../../components/molecules/SignupButton";
import { welcomeData } from "../../constants/CarouselData";
import CarouselItem from "../../components/organisms/CarouselItem";
import Indicator from "../../components/molecules/Indicator";
import { Video, AVPlaybackStatus } from "expo-av";
// import Video from "react-native-video";
import VideoPlayer from "expo-video-player";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const Welcome = () => {
	const navigation = useNavigation();
	const video = useRef(null);
	const [status, setStatus] = useState();

	// Keep track of componenent values so on re-render, values don't change
	const scrollX = useRef(new Animated.Value(0)).current;

	let flatListRef = useRef();

	// TODO: CLEAR INTERVAL WHEN DRAGGED
	const infiniteScroll = (data) => {
		let scrollValue = 0;
		let scrolled = 0;

		if (flatListRef.current) {
			const myInterval = setInterval(() => {
				scrolled++;
				if (scrolled < data.length) {
					scrollValue = scrollValue + screenWidth;
				} else {
					scrollValue = 0;
					scrolled = 0;
				}

				flatListRef.current.scrollToOffset({
					animated: true,
					offset: scrollValue,
				});
			}, 3000);
		}
	};

	useEffect(() => {
		infiniteScroll(welcomeData);
	});

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
			<LinearGradient
				colors={[
					"transparent",
					"transparent",
					"rgba(0,0,0,0.95)",
					"rgba(32, 3, 90,1)",
				]}
				style={styles.bgVideo}
			/>
			{/* <BlurView intensity={10} tint="dark" style={styles.blurContainer}> */}
			<View style={styles.carouselWrapper}>
				<Animated.FlatList
					ref={flatListRef}
					scrollEventThrottle={32}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					// onScrollEndDrag={}
					data={welcomeData}
					keyExtractor={(item) => item.id}
					renderItem={CarouselItem}
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

			<Indicator scrollX={scrollX} />
			{/* </BlurView> */}
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
