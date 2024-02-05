import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";

export default function NewsModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNewPost, setNewPost] = useState(false);

  useEffect(() => {
    const modalTimer = setTimeout(() => {
      setModalVisible(true);
    }, 100); // Adjust the delay time as needed

    // Cleanup function to clear the timer
    return () => clearTimeout(modalTimer);
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.newsModalContainer}>
        <View style={styles.newsModalHeadlineContainer}>
          <Text style={styles.headlineText}>Ny app!!</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(!isModalVisible)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
        </View>
        <View style={styles.newsModalContextContainer}>
          <Text style={styles.contextText}>
            Det här är isoleringslandslagets nya app för installatörer!
          </Text>
        </View>
      </View>
    </Modal>
  );
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
  },
  contextText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "pink",
    borderRadius: 15,
    padding: 5,
    opacity: 0.9,
    borderColor:"black",
    borderWidth:1,
  },
  closeButtonText: {
    fontSize: 20,
  },
});
