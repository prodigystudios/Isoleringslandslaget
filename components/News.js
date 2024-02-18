import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { FIRESTORE_DB } from "./firebase";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
const renderItem = ({ item }) => (
  <>
    <ScrollView>
      <View style={styles.newsInformationContainer}>
        <Text>{item.creator}</Text>
        <Text> {item.date}</Text>
      </View>
      <View style={styles.newsContainer}>
        <Text style={styles.newsTextHeading}>{item.headLine}</Text>
        <Text style={styles.newsText}>{item.newsContent}</Text>
      </View>
    </ScrollView>
  </>
);

export default function News() {
  const [news, SetNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  //fix so this only runs when new data is added to the database!
  useEffect(() => {
    async function fetchDB() {
      try {
        const docRef = collection(FIRESTORE_DB, "News");
        const q = query(docRef, orderBy("date", "desc"));
        const docSnapshot = await getDocs(q);
        const tempFetchedNews = [];
        docSnapshot.forEach((news) => {
          const tempNews = {
            id: news.id,
            creator: news.data().creator,
            date: news.data().date,
            headLine: news.data().headLine,
            newsContent: news.data().newsContent,
          };
          tempFetchedNews.push(tempNews);
        });
        SetNews(tempFetchedNews);
      } catch (error) {
        console.log("this is the error msg:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDB();
    setIsDataLoaded(false);
  }, [isDataLoaded]);
  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.newsInformationContainer}>
            <FlatList
              data={news}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      )}
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
    marginVertical: 10,
    paddingVertical: 5,
    width: "100%",
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
