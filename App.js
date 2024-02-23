import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./components/firebase";
import { densityTypes } from "./constants/data";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactPage from "./components/ContactPage";
import DensityInputs from "./components/DensityInput";
import ImageDetailScreen from "./components/ImageDetailScreen";
import LatHund from "./components/LatHund";
import LogInScreen from "./components/LogInScreen";
import MainHeader from "./components/MainHeader";
import ModalView from "./components/ModalView";
import News from "./components/News";
import NewsModalView from "./components/NewsModalView";
import ProfilScreen from "./components/ProfilScreen";

export const AuthContext = React.createContext();
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

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "white" },
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
    <Tab.Navigator screenOptions={{}}>
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
      <Tab.Screen name="Profil" component={ProfilScreen}
      options={{tabBarIcon:({focused,size}) => (
        <Ionicons name="person" size={size} color={focused ? "#5f98b0" : "black"}/>
      )}} />
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
        <TouchableOpacity onPress={LoadControll}>
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
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [isNewNews, setIsNewNews] = useState(false);
  const auth = FIREBASE_AUTH;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (news.length == 0) {
      console.log("how many times does this run");
      fetchDB();
    }
  }, []);
  async function fetchDB() {
    try {
      const docRef = collection(FIRESTORE_DB, "News");
      const q = query(docRef, orderBy("date", "desc"));
      const docSnapshot = await getDocs(q);
      const tempFetchedNews = [];
      docSnapshot.forEach((news) => {
        const tempNews = {
          id: news.id,
          creator: news.data().creator,
          date: news.data().date,
          headLine: news.data().headLine,
          newsContent: news.data().newsContent,
        };
        tempFetchedNews.push(tempNews);
      });
      const newsCount = tempFetchedNews.length.toString();
      setNews(tempFetchedNews);
      getData(newsCount);
    } catch (error) {
      console.log("this is the error msg:", error);
    }
  }
  const storeData = async (value) => {
    console.log("we are storing data" + value);
    try {
      await AsyncStorage.setItem("my-key", value);
    } catch (error) {
      console.log("we encounterd an error", error);
    }
  };
  const getData = async (newsCount) => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value != newsCount) {
        setIsNewNews(true);
        await storeData(newsCount);
      }
    } catch (error) {
      console.log("there is no value stored");
    }
  };
  const getLatestNews = () => {
    return news.length > 0 ? news[0] : null;
  };
  return (
    <>
      <AuthContext.Provider value={{ user }}>
        {user ? (
          //the user is signed in
          <>
            {isNewNews && (
              <View>
                <NewsModalView
                  isNewNews={isNewNews}
                  latestNews={getLatestNews}
                />
              </View>
            )}
            <NavigationContainer theme={theme}>
              <stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  transitionSpec: {
                    open: { animation: "timing", config: { duration: 1000 } },
                    close: { animation: "timing", config: { duration: 1000 } },
                  },
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
                  cardStyleInterpolator: ({ current }) => ({
                    cardStyle: {
                      opacity: current.progress,
                    },
                  }),
                }}
              >
                <stack.Screen
                  name="Isoleringslandslaget"
                  component={Root}
                  options={{
                    headerTitle: () => <CustomHeader />,
                    title: "Hem",
                  }}
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
        ) : (
          // the user is not signed in
          <LogInScreen />
        )}
      </AuthContext.Provider>
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
