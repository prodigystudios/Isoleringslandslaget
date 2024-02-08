import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import call from "react-native-phone-call";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "./firebase";
import { getDocs, collection, orderBy, query } from "firebase/firestore";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[-\s]/g, "");
};

const handlePhoneNumberPress = (phoneNumber) => {
  const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);
  const args = {
    number: cleanedPhoneNumber,
    prompt: true,
  };
  call(args).catch((error) => console.error("Error making phone call", error));
};

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => handlePhoneNumberPress(item.phoneNumber)}>
    <View style={styles.contactContainer}>
      <View style={styles.topTextContainer}>
        <Text style={styles.contactText}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.contactText}>{item.position}</Text>
      </View>
      <Text style={styles.phoneNumberText}>{item.phoneNumber}</Text>
      <Text style={styles.emailText} ellipsizeMode="tail">
        {item.email}
      </Text>
    </View>
  </TouchableOpacity>
);
function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [contactsManagement, setContactsManagment] = useState([]);
  const [contactsSales, setContactsSales] = useState([]);
  const [expandedWorkerSection, setExpandedWorkerSection] = useState(false);
  const [expanededManagementSection, setExpandedManagementSection] = useState(false);
  const [expanededsalesSection,setExpandedSalesSection] = useState(false);
    useState(false);
  useState(false);

  useEffect(() => {
    async function fetchDB() {
      try {
        const docRef = collection(FIRESTORE_DB, "Contacts");
        const q = query(docRef, orderBy("firstName", "asc"));
        const docSnapshot = await getDocs(q);
        const tempContacts = [];
        const tempManagementContact = [];
        const tempSalesContact = [];
        docSnapshot.forEach((contact) => {
          const tempContact = {
            id: contact.id,
            firstName: contact.data().firstName,
            lastName: contact.data().lastName,
            phoneNumber: contact.data().phoneNumber,
            email: contact.data().email,
            position: contact.data().position,
          };
          if (tempContact.position === "ledning") {
            tempManagementContact.push(tempContact);
          } else if (tempContact.position === "säljare") {
            tempSalesContact.push(tempContact);
          } else tempContacts.push(tempContact);
        });
        setContactsSales(tempSalesContact);
        setContactsManagment(tempManagementContact);
        setContacts(tempContacts);
      } catch (error) {
        console.log("this is the error msg:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDB();
  }, []);
  return (
    <>
      <Text style={styles.headerText}>Medarbetare</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpandedWorkerSection(!expandedWorkerSection);
              }}
            >
              <View style={styles.layoutAnimationHeadingContainer}>
                <Text style={styles.layoutAnimationHeadingText}>
                  Entrepenad
                </Text>
                <Text> {expandedWorkerSection ? "Stäng" : "Öppna"}</Text>
              </View>
            </TouchableOpacity>
            {expandedWorkerSection && (
              <View style={styles.tile}>
                <View>
                  <Text>installatörer</Text>
                </View>
                <FlatList
                  data={contacts}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpandedManagementSection(!expanededManagementSection);
              }}
            >
              <View style={styles.layoutAnimationHeadingContainer}>
                <Text style={styles.layoutAnimationHeadingText}>
                  Ledning Entrepenad
                </Text>
                <Text> {expandedWorkerSection ? "Stäng" : "Öppna"}</Text>
              </View>
            </TouchableOpacity>
            {expanededManagementSection && (
              <View style={styles.tile}>
                <View>
                  <Text>LEDNING</Text>
                </View>
                <FlatList
                  data={contactsManagement}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpandedSalesSection(!expanededsalesSection);
              }}
            >
              <View style={styles.layoutAnimationHeadingContainer}>
                <Text style={styles.layoutAnimationHeadingText}>
                  Säljare
                </Text>
                <Text> {expanededsalesSection ? "Stäng" : "Öppna"}</Text>
              </View>
            </TouchableOpacity>
            {expanededsalesSection && (
              <View style={styles.tile}>
                <View>
                  <Text>Säljare</Text>
                </View>
                <FlatList
                  data={contactsSales}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
}

export default ContactPage;
const styles = StyleSheet.create({
  tile: {
    borderWidth: 2,
    borderColor: "#d6d9da",
    borderRadius: 20,
    padding:10,
  },
  container: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "#d6d7da",
    borderWidth: 0.8,
    borderRadius: 15,
    paddingHorizontal:20,
    paddingTop:20,
  },
  layoutAnimationHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginBottom: 15,
  },
  layoutAnimationHeadingText: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
  },
  contactContainer: {
    borderBottomWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
  },
  topTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactText: {
    fontSize: 20,
    marginTop: 25,
  },
  phoneNumberText: {
    fontSize: 20,
    marginTop: 5,
  },
  emailText: {
    fontSize: 15,
    marginTop: 5,
  },
  loadingContainer: {
    marginVertical: "50%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
