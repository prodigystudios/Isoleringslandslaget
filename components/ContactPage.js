import React, { useEffect, useState } from "react";
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
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cleanPhoneNumber = (phoneNumber) => phoneNumber.replace(/[-\s]/g, "");

const handlePhoneNumberPress = (phoneNumber) => {
  const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);
  const args = {
    number: cleanedPhoneNumber,
    prompt: true,
  };
  call(args).catch((error) => console.error("Error making phone call", error));
};
const ContactItem = ({ item }) => (
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

const ContactSection = ({ title, data, expanded, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.layoutAnimationHeadingContainer}>
        <Text style={styles.layoutAnimationHeadingText}>{title}</Text>
        <Text>{expanded ? "Stäng" : "Öppna"}</Text>
      </View>
    </TouchableOpacity>
    {expanded && (
      <View style={styles.tile}>
        <FlatList
          data={data}
          renderItem={({ item }) => <ContactItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    )}
  </View>
);

function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    worker: false,
    management: false,
    sales: false,
  });

  useEffect(() => {
    async function fetchContacts() {
      try {
        const docRef = collection(FIRESTORE_DB, "Contacts");
        const q = query(docRef, orderBy("firstName", "asc"));
        const docSnapshot = await getDocs(q);
        const tempContacts = [];
        docSnapshot.forEach((contact) => {
          tempContacts.push({
            id: contact.id,
            ...contact.data(),
          });
        });
        setContacts(tempContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <>
      <Text style={styles.headerText}>Medarbetare</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <ContactSection
            title="Entrepenad"
            data={contacts.filter(
              (c) => c.position !== "ledning" && c.position !== "säljare"
            )}
            expanded={expandedSections.worker}
            onPress={() => toggleSection("worker")}
          />
          <ContactSection
            title="Ledning Entrepenad"
            data={contacts.filter((c) => c.position === "ledning")}
            expanded={expandedSections.management}
            onPress={() => toggleSection("management")}
          />
          <ContactSection
            title="Säljare"
            data={contacts.filter((c) => c.position === "säljare")}
            expanded={expandedSections.sales}
            onPress={() => toggleSection("sales")}
          />
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
    padding: 10,
  },
  container: {
    marginTop: 30,
    marginBottom: 15,
    borderColor: "#d6d7da",
    borderWidth: 0.8,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    marginTop: 5,
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
