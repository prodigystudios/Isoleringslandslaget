import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  Modal,
  Pressable,
} from "react-native";

export default function App() {
  const [enterdSquareMeter, setSquareMeter] = useState(0);
  const [enterdDepth, setDepth] = useState(0);
  const [enterdBagAmount, setBagAmmount] = useState(0);
  const [enterdBagWeight, setBagWeight] = useState(0);
  const [calculatedDensity, setCalculatedDensity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  function addSquareMeter(enterdValue) {
    setSquareMeter(parseInt(enterdValue));
  }
  function addDepth(enterdValue) {
    setDepth(parseInt(enterdValue));
  }
  function addBagAmmount(enterdValue) {
    setBagAmmount(parseInt(enterdValue));
  }
  function addBagWeight(enterdValue) {
    setBagWeight(parseInt(enterdValue));
  }

  function calculateDensity() {
    var kubicMeterCalculation = enterdSquareMeter * (enterdDepth / 1000);
    var weightInKilosCalculation = enterdBagAmount * enterdBagWeight;
    setCalculatedDensity(weightInKilosCalculation / kubicMeterCalculation);

    setModalVisible(true);
    Keyboard.dismiss();
  }
  function clearInput() {
    setSquareMeter("");
    setBagAmmount("");
    setBagWeight("");
    setDepth("");
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
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Kvadrat yta"
              value={enterdSquareMeter}
              onChangeText={addSquareMeter}
            />
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Tjocklek"
              value={enterdDepth}
              onChangeText={addDepth}
            />
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Antal säck"
              value={enterdBagAmount}
              onChangeText={addBagAmmount}
            />
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Säckens vikt"
              value={enterdBagWeight}
              onChangeText={addBagWeight}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={calculateDensity} title="Räkna ut" />
            </View>
            <View style={styles.button}>
              <Button title="Töm" onPress={clearInput} />
            </View>
          </View>
        </View>
        <Modal animationType="fade" visible={modalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalViewText}>Din densitet är: {calculatedDensity} Kg/m3</Text>
            <Button title="Stäng" onPress={() => setModalVisible(!modalVisible)}></Button>
          </View>
        </Modal>
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
  textInputContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 16,
    width: 150,
    height: 100,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B2B96",
    height:"100%",
  },
  modalViewText: {
    marginBottom: 30,
    color: "white",
    fontSize: 25,
  }
});
