import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

function DensityInputs(props) {
  const [enterdSquareMeter, setSquareMeter] = useState("");
  const [enterdDepth, setDepth] = useState("");
  const [enterdBagAmount, setBagAmmount] = useState("");
  const [selectedInsulationType, setSelectedInsulationType] = useState("");
  const [selectedConstrutionType, setSelectedConstructionType] = useState("");
  const [calculatedDensity, setCalculatedDensity] = useState(0);
  const [shouldRunEffect, setShouldRunEffect] = useState(false);

  const insulationtypes = [
    { key: 14, value: "Cellulosa ekovilla 14 kg" },
    { key: 15.5, value: "Glasull suprafil 15.5 kg" },
    { key: 14, value: "Träull topcell 14 kg" },
    { key: 12, value: "Träull topcell 12 kg" },
  ];
  const constructionTypes = [
    { key: 1, value: "Vägg/Snedtak" },
    { key: 2, value: "Vind" },
    { key: 3, value: "BottenBjälklag" },
    { key: 4, value: "MellanBjälklag" },
  ];
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
    const selectedInsulation = insulationtypes.find(
      (Element) => Element.value == selectedInsulationType
    );
    const bagWeight = selectedInsulation.key;
    var kubicMeterCalculation = enterdSquareMeter * (enterdDepth / 1000);
    var weightInKilosCalculation = enterdBagAmount * bagWeight;
    setCalculatedDensity(weightInKilosCalculation / kubicMeterCalculation);
    setShouldRunEffect(true);
  };

  useEffect(() => {
    // This will run whenever calculatedDensity changes
    if (shouldRunEffect) {
      props.calculateDensity(
        calculatedDensity,
        selectedConstrutionType,
        selectedInsulationType
      );
      setShouldRunEffect(false);
    }
  }, [calculatedDensity, shouldRunEffect]);

  function clearInput() {
    setSquareMeter("");
    setBagAmmount("");
    setDepth("");
  }
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="isolerad kvadratyta"
        placeholderTextColor={"#7A7A7A"}
        value={enterdSquareMeter === null ? '' : enterdSquareMeter.toString()}
        textContentType="postalCode"
        dataDetectorTypes={"phoneNumber"}
        onChangeText={addSquareMeter}
      />
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="Tjocklek(MILLIMETER)"
        placeholderTextColor={"#7A7A7A"}
        value={enterdDepth === null ? '' : enterdDepth.toString()}
        textContentType="postalCode"
        onChangeText={addDepth}
      />
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder="Antal blåsta säckar"
        placeholderTextColor={"#7A7A7A"}
        value={enterdBagAmount === null ? '' : enterdBagAmount.toString()}
        textContentType="postalCode"
        onChangeText={addBagAmmount}
      />

      <View style={styles.selectListContainer}>
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
            fontSize: 14,
            paddingBottom: 10,
          }}
          inputStyles={{ fontSize: 14 }}
          dropdownItemStyles={{
            borderBottomColor: "white",
            borderBottomWidth: 0.3,
          }}
          placeholder="Välj material"
          setSelected={(val) => setSelectedInsulationType(val)}
          data={insulationtypes}
          save="value"
        />
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
            fontSize: 17,
            paddingBottom: 10,
          }}
          inputStyles={{ fontSize: 14 }}
          placeholder="Välj konstruktion"
          setSelected={(val) => setSelectedConstructionType(val)}
          data={constructionTypes}
          save="value"
          dropdownItemStyles={{
            borderBottomColor: "white",
            borderBottomWidth: 0.3,
          }}
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
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});
