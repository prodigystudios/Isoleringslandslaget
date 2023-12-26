import { StyleSheet, View, TextInput, Button, Pressable, Text } from "react-native";
import { cloneElement, useState } from "react";

function DensityInputs(props) {
    const [enterdSquareMeter, setSquareMeter] = useState(0);
    const [enterdDepth, setDepth] = useState(0);
    const [enterdBagAmount, setBagAmmount] = useState(0);
    const [enterdBagWeight, setBagWeight] = useState(0);

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
            <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                returnKeyType="done"
                placeholder="Säckens vikt"
                placeholderTextColor={"#7A7A7A"}
                value={enterdBagWeight}
                onChangeText={addBagWeight}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Pressable onPress={calculateDensityHandler} style={styles.pressableButtons} android_ripple={true}>
                        <Text style={styles.pressableButtonsText}>Räkna ut</Text>
                    </Pressable>
                </View>
                <View style={styles.button}>
                    <Pressable onPress={clearInput} style={styles.pressableButtons} android_ripple={true}>
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
        color: '#F7F7F7',
    }
})