import {
  View,
  Modal,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

export default function NewsModal(props) {
  const [isModalVisible, setModalVisible] = useState(true); // Initially set as true
  const [latestNews, setLatestNews] = useState(null); // Initially set as null
  const [unReadNews, setUnReadNews] = useState(false);
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const latestPost = await props.latestNews();
        if (latestPost) {
          console.log(props.isNewNews);
          setLatestNews(latestPost);
          setUnReadNews(props.isNewNews);
          console.log("Latest news fetched:", latestPost + " " + unReadNews);
        }
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };
    fetchLatestNews();
  }, [props.latestNews]);
  
  if (unReadNews) {
    return (
      <Modal
        visible={isModalVisible && latestNews !== null} // Only show modal if latestNews is not null
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.newsModalContainer}>
          {latestNews !== null ? (
            <>
              <View style={styles.newsModalHeadlineContainer}>
                <Text style={styles.headlineText}>{latestNews.headLine}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!isModalVisible)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
              </View>
              <View style={styles.newsModalContextContainer}>
                <Text style={styles.contextText}>{latestNews.newsContent}</Text>
              </View>
            </>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </Modal>
    );
  } else if (!unReadNews) {
    return (
      <>
        <Modal animationType="slide" transparent={true}>
          <View style={styles.newsModalContainer}>
          <View style={styles.newsModalContextContainer}>
            <Text style={styles.contextText}>
              Inga nya nyheter för tillfället!
            </Text>
          </View>
          </View>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  newsModalContainer: {
    marginTop: 150,
    alignSelf: "center",
    backgroundColor: "#e68781",
    height: "70%",
    width: "90%",
    borderRadius: 25,
    opacity: 0.96,
  },
  newsModalHeadlineContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headlineText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  newsModalContextContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    marginHorizontal: 12,
  },
  contextText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "pink",
    borderRadius: 15,
    padding: 5,
    opacity: 0.9,
    borderColor: "black",
    borderWidth: 1,
  },
  closeButtonText: {
    fontSize: 20,
  },
});
