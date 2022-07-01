import React, { memo, useEffect, useState } from "react";
import {
	TouchableWithoutFeedback,
	View,
	Image,
	Text,
	ActivityIndicator,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import Colors from "../../constants/Colors";
const ListItem = ({ item, styles, text, onPress }) => {
	// const noImg = require("../../assets/noimage.png");
	const noImg =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
	// const noImg =
	// 	"https://i.pinimg.com/favicons/24fa5a1feaa32e395545f6b8c1d51d452666641ed48fa20b2b1cee6a.ico?e54ff85b7c08779f2b9ffce638f15fdb";
	// const placeholder =
	// 	"https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-768x768.jpg";

	const [img, setImg] = useState();
	const [showItem, setShowItem] = useState(false);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		// if (item.node.image) {
		// 	setImg(item.node.image.src);
		// } else {
		// 	setImg(noImg);
		// }
		setShowItem(true);
	});

	return (
		<TouchableWithoutFeedback onPress={() => onPress(item)}>
			<SharedElement id="sharedElement" style={styles.container}>
				<View>
					{/* <TouchableWithoutFeedback style={styles.wishlistIconWrapper}>
                    <FontAwesome
                        name={isFavorited ? "heart" : "heart-o"}
                        size={24}
                        color="black"
                        style={styles.wishlistIcon}
                    />
                </TouchableWithoutFeedback> */}
					<SharedElement
						id={item.id ? item.id : item.node.id}
						style={styles.productImage}
					>
						{item.thumbnail ? (
							<Image
								// defaultSource={require("../../assets/noimage.png")}
								source={{ uri: item.thumbnail }}
								onError={(e) => {
									// console.log(e.nativeEvent.error);
								}}
								resizeMode="cover"
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 10,
									// backgroundColor: "red",
								}}
							/>
						) : (
							<Image
								defaultSource={require("../../assets/noimage.png")}
								source={
									item.node.image
										? { uri: item.node.image.src }
										: require("../../assets/noimage.png")
								}
								onError={(e) => {
									// console.log(e.nativeEvent.error);
									setIsError(true);
								}}
								resizeMode={isError || !item.node.image ? "contain" : "cover"}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 10,
								}}
							/>
						)}
					</SharedElement>
					<SharedElement id="productInfo" style={styles.productInfo}>
						<Text
							style={[styles.productBrand, { color: text }]}
							numberOfLines={1}
						>
							{item.node ? item.node.brandName : item.brandName}
						</Text>
						<Text
							style={[styles.productName, { color: text }]}
							numberOfLines={1}
						>
							{item.node ? item.node.name : item.name}
						</Text>
					</SharedElement>
				</View>
			</SharedElement>
		</TouchableWithoutFeedback>
	);
};

export default memo(ListItem);
