import React from "react";
import { View, Image, StyleSheet,Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ImageDetailScreen = ({ route }) => {
  const { selectedImage } = route.params;

  return (
    <View style={styles.imageContainer}>
      <Image style={styles.imageBig} source={selectedImage} />
    </View>
  );
};

export default ImageDetailScreen;

const styles = StyleSheet.create({
    imageContainer: {
      marginTop: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    imageBig: {
      width: windowWidth * 1.1,
      height: windowHeight * 1,
      resizeMode: "stretch",
    },
  });