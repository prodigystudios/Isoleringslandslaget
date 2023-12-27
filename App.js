import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, Keyboard } from "react-native";

import ModalView from "./components/ModalView";
import DensityInputs from "./components/DensityInput";
export default function App() {
  const [calculatedDensity, setCalculatedDensity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptedDensity, setAcceptedDensity] = useState(false);
  const [failedDensity, setFailedDensity] = useState(false);

  function calculateDensity(
    enterdSquareMeter,
    enterdDepth,
    enterdBagAmount,
    enterdBagWeight,
    selectedInsulationType,
    selectedConstrutionType
  ) {
    var kubicMeterCalculation = enterdSquareMeter * (enterdDepth / 1000);
    var weightInKilosCalculation = enterdBagAmount * enterdBagWeight;
    setCalculatedDensity(weightInKilosCalculation / kubicMeterCalculation);
    isDensityAccepted(
      calculatedDensity,
      selectedInsulationType,
      selectedConstrutionType
    );
    Keyboard.dismiss();
  }
  function isDensityAccepted(
    calculatedDensity,
    insulationType,
    selectedConstrutionType
  ) {
    switch (insulationType) {
      case "Cellulosa ekovilla 14 kg":
        if (selectedConstrutionType === "Vägg/Snedtak") {
          const minValue = 45;
          const maxValue = 52;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setFailedDensity(true);
        }
        else if(selectedConstrutionType === "Vind") {
          const minValue = 26;
          const maxValue = 32;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setFailedDensity(true);   
        }
        else if(selectedConstrutionType === "BottenBjälklag") {
          const minValue = 42;
          const maxValue = 48;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setFailedDensity(true);   
        }
        else if(selectedConstrutionType === "MellanBjälklag") {
          const minValue = 38;
          const maxValue = 42;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setFailedDensity(true);   
        }
        break;
        //FIXA DENSITERNA FÖR DOM ANDRA MATERIALEN!
      case "Glasull suprafil 15.5 kg":
        if (selectedConstrutionType === "Vägg/Snedtak") {
          console.log(selectedConstrutionType, calculatedDensity);
          const minValue = 45;
          const maxValue = 52;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setAcceptedDensity(false);
        }
        break;
      case "Träull topcell 14 kg":
        if (selectedConstrutionType === "Vägg/Snedtak") {
          console.log(selectedConstrutionType, calculatedDensity);
          const minValue = 45;
          const maxValue = 52;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setAcceptedDensity(false);
        }
        break;
      case "Träull topcell 12 kg":
        if (selectedConstrutionType === "Vägg/Snedtak") {
          console.log(selectedConstrutionType, calculatedDensity);
          const minValue = 45;
          const maxValue = 52;
          if (calculatedDensity > minValue || calculatedDensity <= maxValue) {
            console.log("this is true");
            setAcceptedDensity(true);
          } else setAcceptedDensity(false);
        }
        break;
      default:
        break;
    }

    setModalVisible(true);
  }
  function CloseModal() {
    setModalVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View>
          <Image
            style={styles.headerImage}
            source={require("./assets/iso.jpg")}
          />
        </View>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Densitets kalkylator</Text>
          </View>
          <DensityInputs calculateDensity={calculateDensity} />
        </View>
        <ModalView
          modalVisible={modalVisible}
          calculatedDensity={calculatedDensity}
          onCloseModal={CloseModal}
          acceptedDensity
          failedDensity
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  headerImage: {
    width: "100%",
    height: 100,
  },
  textContainer: {
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  headerText: {
    marginTop: 25,
    marginBottom: 10,
    color: "white",
    fontSize: 20,
  },
});
