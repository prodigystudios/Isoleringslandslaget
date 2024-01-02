import { Modal, View, Button, Text, StyleSheet } from "react-native";
function ModalView(props) {
  if (props.acceptedDensity) {
    return (
      <Modal animationType="fade" visible={props.modalVisible}>
        <View acceptedDensity style={styles.modalView}>
          <Text style={styles.modalViewText}>
            Din densitet är: {props.calculatedDensity} Kg/m3
          </Text>
          <Text style={styles.acceptedDenisty}>Godkänd densitet</Text>
          <Text style={styles.modalViewText}>
            Du håller dig inom dom godkända parametrarna för isolering!
          </Text>
          <Button title="Stäng" onPress={props.onCloseModal}></Button>
        </View>
      </Modal>
    );
  }
  if (props.failedDensity) {
    return (
      <Modal animationType="fade" visible={props.modalVisible}>
        <View style={styles.modalViewNotAcceptedContainer}>
          <Text style={styles.densityText}>
            Din densitet är: {props.calculatedDensity} Kg/m3
          </Text>
          <Text style={styles.notAcceptedDenisty}>För låg/hög densitet</Text>
          <Text style={styles.modalViewText}>
            Se över dina inställningar på maskinen, säkerställ kvaliten på
            materialet o försök igen!
          </Text>
          <View>
            <Text style={styles.modalViewText}>
              Godkända densiteter: Vägg/snedtak 45-52kg/m3
            </Text>
            <Text style={styles.modalViewText}>
              Godkända densiteter: vind 28-32kg/m3
            </Text>
            <Text style={styles.modalViewText}>
              Godkända densiteter: BottenBjälklag 42-45kg/m3
            </Text>
            <Text style={styles.modalViewText}>
              Godkända densiteter: MellanBjälklag 38-42kg/m3
            </Text>
          </View>
          <Button title="Stäng" onPress={props.onCloseModal}></Button>
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
    fontSize: 19,
  },
  modalViewText: {
    marginBottom: 30,
    color: "white",
    fontSize: 18,
  },
  acceptedDenisty: {
    marginBottom: 30,
    color: "green",
    fontSize: 40,
  },
  notAcceptedDenisty: {
    marginBottom: 30,
    color: "red",
    fontSize: 40,
  },
  modalViewNotAcceptedContainer: {
    backgroundColor: "#0B2B96",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
});
