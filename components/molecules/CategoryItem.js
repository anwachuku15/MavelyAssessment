import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet,
	Image,
} from "react-native";
import React from "react";

const CategoryItem = () => {
	const onPress = () => {};
	const renderItem = ({ item }) => {
		<TouchableWithoutFeedback>
			<View style={styles.container}>
				<Image
					source={{ uri: item.categories.image }}
					style={{ width: "100%", height: "100%" }}
					resizeMode="contain"
				/>
			</View>
		</TouchableWithoutFeedback>;
	};
	return (
		<View>
			<Text>CategoryItem</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 100,
	},
});

export default CategoryItem;
