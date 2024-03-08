import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SectionList,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  {
    data: [
      {
        key: "1",
        source: require("../assets/Lathund/tidrapport.png"),
      },
      {
        key: "2",
        source: require("../assets/Lathund/tidrapportTwo.png"),
      },
      {
        key: "3",
        source: require("../assets/Lathund/tidrapportThree.png"),
      },
      {
        key: "4",
        source: require("../assets/Lathund/tidrapportFour.png"),
      },
      {
        key: "5",
        source: require("../assets/Lathund/tidrapportFive.png"),
      },
    ],
  },
];
const ImageDetailScreen = ({ route }) => {
  const { selectedImage } = route.params;
  console.log(selectedImage);
  if (selectedImage === 19) {
    return (
      <>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image style={styles.imageBig} source={item.source} />
            </View>
          )}
        />
      </>
    );
  }
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.imageBig} source={selectedImage} />
      </View>
    </ScrollView>
  );
};

export default ImageDetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBig: {
    width: windowWidth * 1.1,
    height: windowHeight * 1,
    resizeMode: "stretch",
  },
});
