import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ModalView from "./components/ModalView";
import DensityInputs from "./components/DensityInput";
import LatHund from "./components/LatHund";
import ImageDetailScreen from "./components/ImageDetailScreen";
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

function HomeScreen({ navigation }) {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.MainAppSettings}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={require("./assets/IsoleringsLandslaget.png")}
          />
        </View>
        <View style={styles.MainAppContainer}>
          <Pressable
            style={styles.MainMenuPressableContainer}
            onPress={() => navigation.navigate("Density calculator")}
          >
            <Text style={styles.MainMenuButtonsText}>Densitets kalkylator</Text>
          </Pressable>
          <Pressable
            style={styles.MainMenuPressableContainer}
            onPress={() => navigation.navigate("Lathund")}
          >
            <Text style={styles.MainMenuButtonsText}>Lathund</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

function LatHundScreen({ navigation }) {
  return <LatHund navigation={navigation}/>;
}

function DensityCalculationScreen(navigation) {
  const [calculatedDensity, setCalculatedDensity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptedDensity, setAcceptedDensity] = useState(false);
  const [failedDensity, setFailedDensity] = useState(false);

  function OpenModal() {
    setModalVisible(true);
  }
  function CloseModal() {
    setModalVisible(false);
    setAcceptedDensity(false);
    setFailedDensity(false);
  }
  function run(
    calculatedDensity,
    selectedConstructionType,
    selectedInsulationType
  ) {
    setCalculatedDensity(calculatedDensity);
    const selectedInsulationAndType = densityTypes.find(
      (element) =>
        element.name === selectedInsulationType &&
        element.value === selectedConstructionType
    );
    if (
      calculatedDensity >= selectedInsulationAndType.minValue &&
      calculatedDensity <= selectedInsulationAndType.maxValue
    ) {
      setAcceptedDensity(true);
      OpenModal();
    } else {
      setFailedDensity(true);
      OpenModal();
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.MainAppSettings}>
        <View>
          <Image
            style={styles.headerImage}
            source={require("./assets/iso.jpg")}
          />
        </View>
        <View>
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

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ backgroundColor: "#0B2B96" }}>
      <stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0B2B96",
          },
          headerTitleStyle: {
            color: "white",
            alignSelf: "center",
          },
          headerBackTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: "white",
        }}
      >
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen
          name="Density calculator"
          component={DensityCalculationScreen}
          options={{ title: "Densitets kalkylator" }}
        />
        <stack.Screen
          name="Lathund"
          component={LatHundScreen}
          options={{ title: "Lathund" }}
        />
        <stack.Screen name="ImageDetailScreen" component={ImageDetailScreen}options={{title:'Bild'}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  MainAppSettings: {
    backgroundColor: "#bfc1c9",
    height: "100%",
  },
  MainAppContainer: {
    height: "100%",
    justifyContent: "center",
    paddingBottom: 200,
  },
  headerImageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    elevation: Platform.OS === "android" ? 5 : 0, // Add elevation for Android
  },
  headerImage: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  MainMenuPressableContainer: {
    alignItems: "center",
    backgroundColor: "#514b83",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 18,
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
  },
  MainMenuButtonsText: {
    fontSize: 24,
    color: "white",
  },
});
