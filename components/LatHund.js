import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  SectionList,
  Pressable,
} from "react-native";

const data = [
  {
    data: [
      {
        key: "1",
        title: "lathund densiteter",
        source: require("../assets/Lathund/lathundIsolering.png"),
      },
      {
        key: "2",
        title: "Mall densitets beräkning",
        source: require("../assets/Lathund/mall-densitet-och-ytvikt.png"),
      },
      {
        key: "3",
        title: "Tid rapportering",
        source: require("../assets/Lathund/tidrapport.png"),
      },
    ],
  },
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function LatHund({ navigation }) {
  function OpenImage(key) {
    const selectedImage = data
      .flatMap((section) => section.data)
      .find((item) => item.key === key);
    navigation.navigate("ImageDetailScreen", {
      selectedImage: selectedImage.source,
      previousScreenName: 'previousScreenName',
      selectedImageTitel: selectedImage.title

    });
  }
  return (
    <View style={{flex:1}}>
      <Text style={styles.headerText}>
        Klicka på bilderna för att öppna dom i helskärm
      </Text>
      <SectionList
        sections={data}
        contentContainerStyle={{flexGrow:1}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => OpenImage(item.key)}>
            <View style={styles.imageContainer}>
              <Text style={styles.headerText}>{item.title}</Text>
              <Image style={styles.imageSmall} source={item.source} />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default LatHund;

const styles = StyleSheet.create({
  headerText: {
    marginTop: 1,
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 18,
  },
  imageContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    padding:20
  },
  imageSmall: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.5,
    resizeMode: "cover",
  },
});
