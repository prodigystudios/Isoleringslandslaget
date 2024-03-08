import { Image, StyleSheet } from "react-native";

function MainHeader() {
  return (
    <Image
      style={styles.mainHeader}
      source={require("../assets/isoleringslandslagetHeader.png")}
    />
  );
}

export default MainHeader;

const styles = StyleSheet.create({
  mainHeader: {
    alignSelf: "center",
    resizeMode: "contain",
    width: 300,
    height: 100,
    marginTop: 10,
  },
});
