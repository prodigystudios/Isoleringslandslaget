import { Modal, View, Button, Text, StyleSheet } from "react-native";

function HandleNavigation(nav, closeModal) {
  closeModal();
  nav.navigate("Lathund");
}

function ModalView(props, { navigation }) {
  if (props.acceptedDensity) {
    return (
      <Modal animationType="fade" visible={props.modalVisible}>
        <View acceptedDensity style={styles.modalView}>
          <Text style={styles.modalViewText}>
            Din densitet är: {props.calculatedDensity} Kg/m3
          </Text>
          <Text style={styles.acceptedDenisty}>
            Du ligger rätt i densitet för {props.selectedConstructionType}s
            installation
          </Text>
          <Text style={styles.modalViewText}>
            Om du är osäker kan du alltid gå till lathunden för att se godkända
            densiteter!
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Till lathunden"
              onPress={() =>
                HandleNavigation(props.navigation, props.onCloseModal)
              }
            ></Button>
            <Button title="Stäng" onPress={props.onCloseModal}></Button>
          </View>
        </View>
      </Modal>
    );
  }
  if (props.failedDensity) {
    return (
      <Modal animationType="fade" visible={props.modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.densityText}>
            Din densitet är: {props.calculatedDensity} Kg/m3
          </Text>
          <Text style={styles.notAcceptedDenisty}>
            För {props.densityText} densitet för{" "}
            {props.selectedConstructionType}s isolering
          </Text>
          <Text style={styles.modalViewText}>
            Se över dina inställningar på maskinen, säkerställ kvaliten på
            materialet o försök igen! Kolla gärna in lathunden om du är osäker
            på vilken densitet som det ska vara!
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Till lathunden"
              onPress={() =>
                HandleNavigation(props.navigation, props.onCloseModal)
              }
            ></Button>
            <Button title="Stäng" onPress={props.onCloseModal}></Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalView;

const styles = StyleSheet.create({
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B2B96",
    height: "100%",
    paddingHorizontal: 20,
  },
  densityText: {
    color: "white",
    fontSize: 20,
  },
  modalViewText: {
    marginBottom: 30,
    color: "white",
    fontSize: 18,
  },
  acceptedDenisty: {
    marginVertical: 30,
    color: "green",
    fontSize: 25,
    flexWrap: "nowrap",
  },
  notAcceptedDenisty: {
    marginVertical: 30,
    color: "red",
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 50,
    gap:50,
  },
});
