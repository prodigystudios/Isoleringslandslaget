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
        console.log("User logged in:", user);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <>
      <View>
        <Image
          source={require("../assets/IsoleringsLandslaget.png")}
          style={styles.logInImage}
        />
      </View>
      <View style={styles.container}>
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
  logInImage: {
    alignSelf: "center",
    resizeMode: "contain",
    width: 200,
    height: 200,
    marginVertical:"50%"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LogInScreen;
