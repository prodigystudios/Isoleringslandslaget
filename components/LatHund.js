import { useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  SectionList,
  Pressable,
  Modal,
  ScrollView,
  Button,
} from "react-native";

const data = [
  {
    data: [
      {
        key: "1",
        title: "lathund densiteter",
        source: require("../assets/lathundIsolering.png"),
      },
      {
        key: "2",
        title: "Mall densitets beräknin",
        source: require("../assets/mall-densitet-och-ytvikt.png"),
      },
      {
        key: "3",
        title: "Tid rapportering",
        source: require("../assets/tidrapport.png"),
      },
    ],
  },
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function LatHund() {
  const [selectedImage, setSelectedImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function OpenModal(key) {
    const selectedImage = data
      .flatMap((section) => section.data)
      .find((item) => item.key === key);
    setSelectedImage(selectedImage.source);
    setModalVisible(true);
  }
  function closeModal() {
    setSelectedImage('');
    setModalVisible(false);
  }

  return (
    <>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => OpenModal(item.key)}>
            <View style={styles.imageContainer}>
              <Text>{item.title}</Text>
              <Image style={styles.imageSmall} source={item.source} />
            </View>
          </Pressable>
        )}
      />
      <ScrollView>
        <Modal visible={modalVisible}>
          <View style={styles.imageContainer}>
            <Button onPress={closeModal} title="Stäng" />
            <Image style={styles.imageBig} source={selectedImage} />
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

export default LatHund;
const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imageSmall: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: "cover",
  },
  imageBig: {
    width: windowWidth * 1.1,
    height: windowHeight * 1,
    resizeMode: "stretch",
  },
});
