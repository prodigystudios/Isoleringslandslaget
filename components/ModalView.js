import { useState } from "react";
import { Modal, View, Button, Text, StyleSheet } from "react-native";

function ModalView(props) {
  const aDensity = 50;

  if (props.acceptedDensity) {
    return (
      <Modal animationType="fade" visible={props.modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalViewText}>
            Din densitet är: {props.calculatedDensity} Kg/m3
          </Text>
          <Text style={styles.acceptedDenisty}>Godkänd densitet</Text>
          <Text style={styles.modalViewText}>Du håller dig inom dom godkända parametrarna för isolering!</Text>
          <Button title="Stäng" onPress={props.onCloseModal}></Button>
        </View>
      </Modal>
    );
  } else if(props.failedDensity) {
    return (
      <Modal animationType="fade" visible={props.modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalViewText}>
            Din densitet är: {props.calculatedDensity} Kg/m3
          </Text>
          <Text style={styles.notAcceptedDenisty}>För låg densitet</Text>
          <Text style={styles.modalViewText}>Se över dina inställningar på maskinen, säkerhetställ kvaliten på materialet o försök igen!</Text>
          <Text style={styles.modalViewText}>Godkända densiteter: Vägg/snedtak 45-52kg/m3</Text>
          <Text style={styles.modalViewText}>Godkända densiteter: vind 28-32kg/m3</Text>
          <Text style={styles.modalViewText}>Godkända densiteter: BottenBjälklag 42-45kg/m3</Text>
          <Text style={styles.modalViewText}>Godkända densiteter: MellanBjälklag 38-42kg/m3</Text>
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
  },
  modalViewText: {
    marginBottom: 30,
    color: "white",
    fontSize: 25,
  },
  acceptedDenisty: {
    marginBottom: 30,
    color: "green",
    fontSize: 40,
  },
  notAcceptedDenisty:{
    marginBottom: 30,
    color: "red",
    fontSize: 40,  
  }
});
