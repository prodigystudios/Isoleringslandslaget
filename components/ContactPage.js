import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import call from "react-native-phone-call";
const contacts = [
  {
    id: "1",
    name: "Patrik vall",
    tel: "070-694 31 30",
    email: "Patrik@isoleringslandslaget.se",
  },
  {
    id: "2",
    name: "William ali",
    tel: "072-902 21 98",
    email: "william@isoleringslandslaget.se",
  },
];
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
  <TouchableOpacity onPress={() => handlePhoneNumberPress(item.tel)}>
    <View style={styles.contactContainer}>
      <Text style={styles.contactText}>{item.name}</Text>
      <Text style={styles.phoneNumberText}>{item.tel}</Text>
      <Text style={styles.emailText}>{item.email}</Text>
    </View>
  </TouchableOpacity>
);
function ContactPage() {
  return (
    <>
      <Text style={styles.headerText}>Medarbetare</Text>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
    fontSize: 20,
    marginTop: 5,
  },
});
