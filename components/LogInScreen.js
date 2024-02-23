import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { FIREBASE_AUTH } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful, do something
        const user = userCredential.user;
        user.displayName = "Test";
        console.log("User logged in:", user);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/IsoleringsLandslaget.png")}
          style={styles.logInImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Logga in" onPress={handleLogin} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 16,
    marginTop:50,
  },
  logInImage: {
    marginBottom:60,
    resizeMode: "contain",
    width: 200,
    height: 200,
  },
  input: {
    width: "100%",
    height: 60,
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 20,
    marginBottom:5,
  },
});

export default LogInScreen;
