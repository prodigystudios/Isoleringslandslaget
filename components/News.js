import { View, Text, StyleSheet } from "react-native";
export default function News() {
  return (
    <>
      <View style={styles.newsInformationContainer}>
        <Text>Patrik vall</Text>
        <Text>7/2-24</Text>
      </View>
      <View style={styles.newsContainer}>
        <Text style={styles.newsTextHeading}>NY app!</Text>
        <Text style={styles.newsText}>
          Vi har samlats här idag för konferens. Detta är en ny del i
          utvecklingen av entreprenad som kommer att lättja eran vardag för att
          informationen som vi har påpekat från ledningen måste in! Vi måste
          stärka alla led. Vi har sett brister med appen som ingen verkar
          använda sig av ändå! Med hjälp av William som har utbildning inom
          området kodning så har det bollas idéer som ledde till början av denna
          app. Se nu till att använda denna flitigt för det här skall vara ett
          hjälpmedel för oss alla.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  newsInformationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  newsContainer: {
    alignSelf: "center",
    borderColor: "gray",
    borderCurve: "circular",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 2,
    paddingTop: 5,
  },
  newsTextHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  newsText: {
    fontSize: 20,
    fontStyle: "italic",
    marginTop: 25,
    marginHorizontal: 10,
  },
});
