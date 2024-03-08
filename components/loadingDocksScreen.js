import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking
} from "react-native";
import { loadingSites } from "../constants/data";
export default function LoadingDocks() {

    const openMapsApp = (adress ) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${adress}}`;
        Linking.openURL(url);
      };

    return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Lastplatser</Text>
          <View style={styles.dockContainer}>
            <FlatList 
              data={loadingSites}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openMapsApp(item.adress)}>
                  <Text style={styles.dockContainerHeadLine}>{item.title}</Text>
                  <Text style={styles.dockContainerText}>{item.adress}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ); 
  }

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
  },
  dockContainer: {
    marginTop: 25,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
    dockContainerHeadLine: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },
    dockContainerText: {
        fontSize: 18,
    },
});
