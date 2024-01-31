import { View, Text, FlatList, StyleSheet } from "react-native";

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
  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}> 
      <Text style={styles.contactText}>{item.name}</Text>
      <Text style={styles.phoneNumberText}>{item.tel}</Text>
      <Text style={styles.emailText}>{item.email}</Text>
    </View>
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
    headerText:{
        fontSize:30,
        fontWeight:"bold",
    },
    contactContainer: {
      alignSelf:"center",
      borderBottomWidth: 1,
      borderColor: "black",
  },
    contactText: {
      fontSize:25,
      marginTop:25,
    },
    phoneNumberText: {
        fontSize:20,
        marginTop:5,
    },
    emailText:{
        fontSize:20,
        marginTop:5
    }


  });


