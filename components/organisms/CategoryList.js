import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/queries";
import Colors from "../../constants/Colors";

const CategoryList = () => {
	const { data, loading, error } = useQuery(GET_CATEGORIES);
	const { text } = useTheme().colors;
	useEffect(() => {
		// console.log(data);
	});

	const navigation = useNavigation();
	const onPress = (item) => {
		// console.log(item.name);
	};
	const renderItem = ({ item }) => (
		<TouchableWithoutFeedback onPress={() => onPress(item)}>
			<View style={styles.item}>
				<Image
					style={{ width: "100%", height: "100%" }}
					resizeMode="cover"
					source={{
						uri:
							item.image !== ""
								? item.image
								: "https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-768x768.jpg",
					}}
					blurRadius={1}
				/>
				<View
					style={{
						position: "absolute",
						zIndex: 9,
						alignSelf: "center",
						top: 10,
					}}
				>
					<Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
						{/* {item.name !== "New Arrivals" ? item.name : ""} */}
						{item.name}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);

	// if (loading) {
	// 	return (
	// 		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	// 			<ActivityIndicator size="large" color={Colors.purple} />
	// 		</View>
	// 	);
	// }

	return (
		<FlatList
			style={{ flex: 1, paddingHorizontal: 10 }}
			columnWrapperStyle={{ justifyContent: "space-evenly" }}
			data={data && data.categories}
			keyExtractor={(_, index) => index.toString()}
			renderItem={renderItem}
			ListHeaderComponent={() => (
				<Text style={{ color: text }}>CATEGORIES</Text>
			)}
			initialNumToRender={7}
			numColumns={2}
		/>
	);
};

const styles = StyleSheet.create({
	item: {
		// flex: 1,
		width: "48%",
		height: 50,
		backgroundColor: "red",
		borderRadius: 10,
		overflow: "hidden",
		marginVertical: 5,
	},
});

export default CategoryList;
