import { Modal, View, Button, Text, StyleSheet } from "react-native";

function ModalView(props) {
    return (
        <Modal animationType="fade" visible={props.modalVisible}>
            <View style={styles.modalView}>
                <Text style={styles.modalViewText}>Din densitet är: {props.calculatedDensity} Kg/m3</Text>
                <Button title="Stäng" onPress={props.onCloseModal}></Button>
            </View>
        </Modal>
    )
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
    }
}
)



