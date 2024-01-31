import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ModalView from "./components/ModalView";
import DensityInputs from "./components/DensityInput";
import LatHund from "./components/LatHund";
import ImageDetailScreen from "./components/ImageDetailScreen";
import MainHeader from "./components/MainHeader";
import News from "./components/News";
import ContactPage from "./components/ContactPage";

const Drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();
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
  {
    index: 5,
    name: "Glasull suprafil 15.5 kg",
    value: "Vind",
    minValue: 11,
    maxValue: 13,
  },
  {
    index: 6,
    name: "Glasull suprafil 15.5 kg",
    value: "Vägg/Snedtak",
    minValue: 18,
    maxValue: 23,
  },
  {
    index: 7,
    name: "Glasull suprafil 15.5 kg",
    value: "MellanBjälklag",
    minValue: 16,
    maxValue: 18,
  },
  {
    index: 8,
    name: "Glasull suprafil 15.5 kg",
    value: "BottenBjälklag",
    minValue: 17,
    maxValue: 20,
  },
  {
    index: 9,
    name: "Träull topcell 14 kg",
    value: "Vägg/Snedtak",
    minValue: 54,
    maxValue: 62,
  },
  {
    index: 10,
    name: "Träull topcell 14 kg",
    value: "Vind",
    minValue: 32,
    maxValue: 36,
  },
  {
    index: 11,
    name: "Träull topcell 14 kg",
    value: "BottenBjälklag",
    minValue: 54,
    maxValue: 57,
  },
  {
    index: 12,
    name: "Träull topcell 12 kg",
    value: "MellanBjälklag",
    minValue: 34,
    maxValue: 37,
  },
  {
    index: 9,
    name: "Träull topcell 12 kg",
    value: "Vägg/Snedtak",
    minValue: 54,
    maxValue: 62,
  },
  {
    index: 10,
    name: "Träull topcell 12 kg",
    value: "Vind",
    minValue: 32,
    maxValue: 36,
  },
  {
    index: 11,
    name: "Träull topcell 12 kg",
    value: "BottenBjälklag",
    minValue: 54,
    maxValue: 57,
  },
  {
    index: 12,
    name: "Träull topcell 12 kg",
    value: "MellanBjälklag",
    minValue: 34,
    maxValue: 37,
  },
];

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#bfc1c9" },
};

function Root() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerLabelStyle: { fontSize: 22 },
        drawerActiveTintColor: "#5f98b0",
        headerStyle: { backgroundColor: "#0B2B96" },
        headerTitleStyle: { color: "white", alignSelf: "center" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? "#5f98b0" : "ccc"}
            />
          ),
        }}
        name="Nyheter"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="calculator-sharp"
              size={size}
              color={focused ? "ccc" : "#5f98b0"}
            />
          ),
        }}
        name="Kalkylator"
        component={DensityCalculationScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="documents-sharp"
              size={size}
              color={focused ? "ccc" : "#5f98b0"}
            />
          ),
        }}
        name="Lathund"
        component={LatHundScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-document-sharp"
              size={size}
              color={focused ? "ccc" : "#5f98b0"}
            />
          ),
        }}
        name="EgenKontroll"
        component={LoadControll}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={focused ? "ccc" : "#5f98b0"}
            />
          ),
        }}
        name="Medarbetare"
        component={ContactScreen}
      />
    </Drawer.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <>
      <StatusBar style="light" />
      <View>
        <News />
      </View>
    </>
  );
}

function LatHundScreen({ navigation }) {
  return (
    <View style={styles.wrappableContainer}>
      <MainHeader />
      <LatHund navigation={navigation} />
    </View>
  );
}

function DensityCalculationScreen({ navigation }) {
  const [highOrLowDensityText, setHighorLowDensityText] = useState("");
  const [calculatedDensity, setCalculatedDensity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptedDensity, setAcceptedDensity] = useState(false);
  const [failedDensity, setFailedDensity] = useState(false);
  const [selectedConstrutionType, setSelectedConstructionType] = useState("");

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
    setSelectedConstructionType(selectedConstructionType);
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
      if (calculatedDensity < selectedInsulationAndType.minValue) {
        setHighorLowDensityText("låg");
      } else setHighorLowDensityText("Hög");
      setFailedDensity(true);
      OpenModal();
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View>
        <View style={styles.headerImageContainer}>
          <MainHeader />
        </View>
        <View>
          <DensityInputs calculateDensity={run} />
        </View>
        <ModalView
          navigation={navigation}
          modalVisible={modalVisible}
          calculatedDensity={calculatedDensity}
          acceptedDensity={acceptedDensity}
          failedDensity={failedDensity}
          densityText={highOrLowDensityText}
          selectedConstructionType={selectedConstrutionType}
          onCloseModal={CloseModal}
        />
      </View>
    </>
  );
}
function ContactScreen() {
  return (
    <View>
      <ContactPage />
    </View>
  );
}
const LoadControll = () => {
  const url = "https://eu.jotform.com/app/232263104050338/211592860500046";

  // Open the link
  Linking.openURL(url)
    .then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
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
        <stack.Screen
          name="Isoleringslandslaget"
          component={Root}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="ImageDetailScreen"
          component={ImageDetailScreen}
          options={{ title: "Bild" }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  wrappableContainer: {
    flex: 2,
    paddingBottom: 300,
  },
  mainMenuContainer: {
    marginVertical: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  headerImageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
