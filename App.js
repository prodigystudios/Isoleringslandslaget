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

  const densityTypes = [
    {
      index: 1,
      name: "Cellulosa ekovilla 14 kg",
      value: "Vind",
      minValue: 26,
      maxValue: 30,
    },
    {
      index: 2,
      name: "Cellulosa ekovilla 14 kg",
      value: "Vägg/Snedtak",
      minValue: 45,
      maxValue: 53,
    },
    {
      index: 3,
      name: "Cellulosa ekovilla 14 kg",
      value: "BottenBjälklag",
      minValue: 42,
      maxValue: 48,
    },
    {
      index: 4,
      name: "Cellulosa ekovilla 14 kg",
      value: "MellanBjälklag",
      minValue: 38,
      maxValue: 42,
    },
  ];

  function run(
    calculatedDensityy,
    selectedConstructionType,
    selectedInsulationType
  ) {
    setCalculatedDensity(calculatedDensityy);
    const selectedInsulationAndType = densityTypes.find(
      (element) =>
        element.name === selectedInsulationType &&
        element.value === selectedConstructionType
    );
    if (
      calculatedDensityy >= selectedInsulationAndType.minValue &&
      calculatedDensityy <= selectedInsulationAndType.maxValue
    ) {
      setAcceptedDensity(true);
      OpenModal();
    } else {
      setFailedDensity(true);
      OpenModal();
    }
  }
  function OpenModal() {
    setModalVisible(true);
  }
  function CloseModal() {
    setModalVisible(false);
    setAcceptedDensity(false);
    setFailedDensity(false);
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
          <DensityInputs calculateDensity={run} />
        </View>
        <ModalView
          modalVisible={modalVisible}
          calculatedDensity={calculatedDensity}
          acceptedDensity={acceptedDensity}
          failedDensity={failedDensity}
          onCloseModal={CloseModal}
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
