import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState } from "react";

function DensityInputs(props) {
    const [enterdSquareMeter, setSquareMeter] = useState('');
    const [enterdDepth, setDepth] = useState('');
    const [enterdBagAmount, setBagAmmount] = useState('');
    const [enterdBagWeight, setBagWeight] = useState('');

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
    const calculateDensityHandler = () => {
        const squareMeter = enterdSquareMeter;
        const depth = enterdDepth;
        const bagAmount = enterdBagAmount;
        const bagWeight = enterdBagWeight;
        props.calculateDensity(squareMeter, depth, bagAmount, bagWeight);
    }

    function clearInput() {
        setSquareMeter("");
        setBagAmmount("");
        setBagWeight("");
        setDepth("");
    }
    return (
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
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button onPress={calculateDensityHandler} title="Räkna ut" />
                </View>
                <View style={styles.button}>
                    <Button title="Töm" onPress={clearInput} />
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
})