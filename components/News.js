import { View, Text, StyleSheet } from "react-native";

export default function News() {
  return (
    <View style={styles.newsContainer}>
      <Text style={styles.newsText}>
        Välkommen till nyhetsidan och våran nya app! Här kommer uppdateringar frekvent som rör
        installatörerna!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    alignSelf:"center"
},
  newsText: {
    fontSize:20,
    marginTop:25,
  }
});
