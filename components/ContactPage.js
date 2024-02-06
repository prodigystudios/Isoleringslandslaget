import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import call from "react-native-phone-call";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "./firebase";
import { getDocs, collection,orderBy,query } from "firebase/firestore";

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
      <Text style={styles.contactText}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.phoneNumberText}>{item.phoneNumber}</Text>
      <Text style={styles.emailText} ellipsizeMode="tail">
        {item.email}
      </Text>
    </View>
  </TouchableOpacity>
);
function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDB() {
      try {
        const docRef = collection(FIRESTORE_DB, "Contacts");
        const q = query(docRef,orderBy("firstName","asc"))
        const docSnapshot = await getDocs(q);
        const tempContacts = [];
        docSnapshot.forEach((contact) => {
          const tempContact = {
            id: contact.id,
            firstName: contact.data().firstName,
            lastName: contact.data().lastName,
            phoneNumber: contact.data().phoneNumber,
            email: contact.data().email,
          };
          console.log(tempContact);
          tempContacts.push(tempContact);
        });
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
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}

export default ContactPage;
const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
  },
  contactContainer: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  contactText: {
    fontSize: 25,
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
