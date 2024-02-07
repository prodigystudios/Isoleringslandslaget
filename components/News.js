import { View, Text, StyleSheet } from "react-native";
export default function News() {
  return (
    <View style={styles.newsContainer}>
      <Text style={styles.newsText}>
        vi har samlats här idag för konferens. Detta är en ny del i utvecklingen
        av entreprenad som kommer att lättja eran vardag för att informationen
        som vi har påpekat från ledningen måste in! Vi måste stärka alla led. Vi
        har sett brister med appen som ingen verkar använda sig av ändå! Med
        hjälp av William som har utbildning inom området kodning så har det
        bollas idéer som ledde till början av denna app. Se nu till att använda
        denna flitigt för det här skall vara ett hjälpmedel för oss alla.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    alignSelf: "center",
  },
  newsText: {
    fontSize: 20,
    marginTop: 25,
    marginHorizontal:10,
  },
});
