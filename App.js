import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalView from "./components/ModalView";
import DensityInputs from "./components/DensityInput";
import LatHund from "./components/LatHund";
import ImageDetailScreen from "./components/ImageDetailScreen";
import MainHeader from "./components/MainHeader";
import News from "./components/News";
import ContactPage from "./components/ContactPage";
import NewsModalView from "./components/NewsModalView";

// import { createDrawerNavigator } from "@react-navigation/drawer";
const CustomHeader = () => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Image
      source={require("./assets/isoleringslandslagetHeader.png")}
      style={{ width: 125, height: 40 }}
    />
  </View>
);

// const Drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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

//Drawer navigation Keep for later use or changes!
// function Root() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         drawerLabelStyle: { fontSize: 22 },
//         drawerActiveTintColor: "#5f98b0",
//         headerStyle: { backgroundColor: "white" },
//         headerTitleStyle: { color: "black", alignSelf: "center" },
//         headerTintColor: "white",
//       }}
//     >
//       <Drawer.Screen
//         options={{
//           drawerIcon: ({ focused, size }) => (
//             <Ionicons
//               name="md-home"
//               size={size}
//               color={focused ? "#5f98b0" : "ccc"}
//             />
//           ),
//         }}
//         name="Nyheter"
//         component={HomeScreen}
//       />
//       <Drawer.Screen
//         options={{
//           drawerIcon: ({ focused, size }) => (
//             <Ionicons
//               name="calculator-sharp"
//               size={size}
//               color={focused ? "ccc" : "#5f98b0"}
//             />
//           ),
//         }}
//         name="Kalkylator"
//         component={DensityCalculationScreen}
//       />
//       <Drawer.Screen
//         options={{
//           drawerIcon: ({ focused, size }) => (
//             <Ionicons
//               name="documents-sharp"
//               size={size}
//               color={focused ? "ccc" : "#5f98b0"}
//             />
//           ),
//         }}
//         name="Lathund"
//         component={LatHundScreen}
//       />
//       <Drawer.Screen
//         options={{
//           drawerIcon: ({ focused, size }) => (
//             <Ionicons
//               name="md-document-sharp"
//               size={size}
//               color={focused ? "ccc" : "#5f98b0"}
//             />
//           ),
//         }}
//         name="Egenkontroll"
//         component={LoadControll}
//       />
//       <Drawer.Screen
//         options={{
//           drawerIcon: ({ focused, size }) => (
//             <Ionicons
//               name="person"
//               size={size}
//               color={focused ? "ccc" : "#5f98b0"}
//             />
//           ),
//         }}
//         name="Medarbetare"
//         component={ContactScreen}
//       />
//     </Drawer.Navigator>
//   );
// }

function MainStackScreen() {
  return (
    <stack.Navigator>
      <stack.Screen name="lathund" component={LatHundScreen} />
      <stack.Screen name="Kalkylator" component={DensityCalculationScreen} />
      <stack.Screen
        name="ImageDetailScreen"
        component={ImageDetailScreen}
        options={({ route }) => ({
          title:
            route.params && route.params.selectedImageTitel
              ? `${route.params.selectedImageTitel}`
              : "Default Title",
        })}
      />
    </stack.Navigator>
  );
}

function Root() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? "#5f98b0" : "black"}
            />
          ),
        }}
        name="Hem"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="newspaper"
              size={size}
              color={focused ? "#5f98b0" : "black"}
            />
          ),
        }}
        name="Nyheter"
        component={NewsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="call"
              size={size}
              color={focused ? "#5f98b0" : "black"}
            />
          ),
        }}
        name="Kontaktlista"
        component={ContactScreen}
      />
    </Tab.Navigator>
  );
}

function HomeScreen({}) {
  const navigation = useNavigation();
  const navigateToKalkylator = () => {
    navigation.navigate("mainStack", {
      screen: "Kalkylator",
    });
  };
  const navigateToLathund = () => {
    navigation.navigate("mainStack", {
      screen: "lathund",
    });
  };
  return (
    <View style={styles.menuButtonContainer}>
      <ScrollView>
        <TouchableOpacity onPress={navigateToKalkylator}>
          <View style={styles.buttonContainerYellow}>
            <Image
              style={{ width: 215, height: 215 }}
              source={require("./assets/kalkylator.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLathund}>
          <View style={styles.buttonContainerBlue}>
            <Image
              style={{ width: 215, height: 215 }}
              source={require("./assets/lathund.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.buttonContainerYellow}>
            <Image
              style={{ width: 215, height: 215 }}
              source={require("./assets/egenkontroll.png")}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
function NewsScreen() {
  return (
    <>
      <StatusBar style="dark" />
      <View>
        <News />
      </View>
    </>
  );
}
function LatHundScreen({ navigation }) {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.wrappableContainer}>
        <MainHeader />
        <LatHund navigation={navigation} />
      </View>
    </>
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
      <StatusBar style="dark" />
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
    <ScrollView>
      <View>
        <ContactPage />
      </View>
    </ScrollView>
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
    <>
      <View>
        <NewsModalView />
      </View>
      <NavigationContainer theme={theme}>
        <stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
            headerBackTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: "black",
          }}
        >
          <stack.Screen
            name="Isoleringslandslaget"
            component={Root}
            options={{ headerTitle: () => <CustomHeader />, title: "Hem" }}
          />
          <stack.Screen
            name="mainStack"
            component={MainStackScreen}
            options={({ route }) => ({
              title:
                route.params && route.params.previousScreenName
                  ? `Screen from ${route.params.previousScreenName}`
                  : "Default Title",
              headerTitle: () => <CustomHeader />,
            })}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonContainerYellow: {
    backgroundColor: "#f08513",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainerBlue: {
    backgroundColor: "#4287f5",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  wrappableContainer: {
    flex: 1,
    paddingBottom: 0,
  },
  headerImageContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    overflow: "visible",
    elevation: Platform.OS === "android" ? 5 : 0, // Add elevation for Android
  },
  newsModal: {
    width: "80%",
    height: "80%",
  },
});
