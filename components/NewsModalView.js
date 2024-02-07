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
            vi har samlats här idag för konferens. Detta är en ny del i
            utvecklingen av entreprenad som kommer att lättja eran vardag för
            att informationen som vi har påpekat från ledningen måste in! Vi
            måste stärka alla led. Vi har sett brister med appen som ingen
            verkar använda sig av ändå! Med hjälp av William som har utbildning
            inom området kodning så har det bollas idéer som ledde till början
            av denna app. Se nu till att använda denna flitigt för det här skall
            vara ett hjälpmedel för oss alla.
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
    marginHorizontal:12,
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
