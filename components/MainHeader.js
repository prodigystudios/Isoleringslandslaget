import { View, Image, StyleSheet } from "react-native";

function MainHeader() {
  return (
    <Image
      style={styles.mainHeader}
      source={require("../assets/IsoleringsLandslaget.png")}
    />
  );
}

export default MainHeader;

const styles = StyleSheet.create({
  mainHeader: {
    alignSelf: "center",
    resizeMode: "contain",
    width: 150,
    height: 150,
    marginTop: 10,
  },
});
