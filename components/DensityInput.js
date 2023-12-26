import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

function DensityInputs(props) {
  const [enterdSquareMeter, setSquareMeter] = useState('');
  const [enterdDepth, setDepth] = useState('');
  const [enterdBagAmount, setBagAmmount] = useState('');
  const [selectedInsulationType, setSelectedInsulationType] = useState(0);

  function addSquareMeter(enterdValue) {
    setSquareMeter(parseInt(enterdValue));
  }
  function addDepth(enterdValue) {
    setDepth(parseInt(enterdValue));
  }
  function addBagAmmount(enterdValue) {
    setBagAmmount(parseInt(enterdValue));
  }
  const calculateDensityHandler = () => {
    const squareMeter = enterdSquareMeter;
    const depth = enterdDepth;
    const bagAmount = enterdBagAmount;
    const bagWeight = selectedInsulationType;
    props.calculateDensity(squareMeter, depth, bagAmount, bagWeight);
  };

  const data = [
    { key: 14, value: "Cellulosa ekovilla 14 kg" },
    { key: 15.5, value: "Glasull suprafil 15.5 kg" },
    { key: 14, value: "Träull topcell 14 kg" },
    { key: 12, value: "Träull topcell 12 kg" },
  ];

  function clearInput() {
    setSquareMeter("");
    setBagAmmount("");
    setDepth("");
    setSelectedInsulationType("");
  }
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="Kvadrat yta"
        placeholderTextColor={"#7A7A7A"}
        value={enterdSquareMeter}
        onChangeText={addSquareMeter}
      />
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="Tjocklek"
        placeholderTextColor={"#7A7A7A"}
        value={enterdDepth}
        onChangeText={addDepth}
      />
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="Antal säck"
        placeholderTextColor={"#7A7A7A"}
        value={enterdBagAmount}
        onChangeText={addBagAmmount}
      />
      <View styles={styles.selectListContainer}>
        <SelectList
          boxStyles={{ backgroundColor: "white" }}
          dropdownStyles={{
            backgroundColor: "#3A3679",
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderLeftColor: "white",
            borderBottomColor: "white",
          }}
          dropdownTextStyles={{
            color: "white",
            fontFamily: "Cochin",
            fontSize: 22,
            paddingHorizontal: 75,
            paddingBottom: 10,
          }}
          inputStyles={{ fontFamily: "Cochin", fontSize: 22 }}
          placeholder="Välj material"
          setSelected={(val) => setSelectedInsulationType(val)}
          data={data}
          save="key"
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Pressable
            onPress={calculateDensityHandler}
            style={styles.pressableButtons}
            android_ripple={true}
          >
            <Text style={styles.pressableButtonsText}>Räkna ut</Text>
          </Pressable>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={clearInput}
            style={styles.pressableButtons}
            android_ripple={true}
          >
            <Text style={styles.pressableButtonsText}>Rensa</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
export default DensityInputs;
const styles = StyleSheet.create({
  textInputContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    width: "80%",
    height: 50,
    fontFamily: "Cochin",
    fontSize: 18,
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
  pressableButtons: {
    width: 150,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  pressableButtonsText: {
    fontSize: 24,
    color: "#F7F7F7",
  },
  selectListContainer: {
    width: "100%",
  },
});
