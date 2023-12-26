import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
} from "react-native";

import ModalView from "./components/ModalView";
import DensityInputs from "./components/DensityInput";
export default function App() {
  const [calculatedDensity, setCalculatedDensity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function calculateDensity(enterdSquareMeter, enterdDepth, enterdBagAmount, enterdBagWeight) {
    var kubicMeterCalculation = enterdSquareMeter * (enterdDepth / 1000);
    var weightInKilosCalculation = enterdBagAmount * enterdBagWeight;
    setCalculatedDensity(weightInKilosCalculation / kubicMeterCalculation);
    setModalVisible(true);
    Keyboard.dismiss();
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
        <ModalView modalVisible={modalVisible} calculatedDensity={calculatedDensity} onCloseModal={CloseModal} />
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
  },
  headerText: {
    marginTop: 25,
    marginBottom: 10,
    color: "white",
    fontSize: 20,
  },
});
