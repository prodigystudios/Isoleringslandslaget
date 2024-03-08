import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = FIREBASE_AUTH;
    const signUpUser = () => {
        // Create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User signed up successfully
                const user = userCredential.user;
                console.log('User signed up:', user);
                // Add any additional logic here, such as navigating to a new screen
            })
            .catch((error) => {
                // Error occurred during sign up
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Sign up error:', errorCode, errorMessage);
            }); 
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button
                title="Sign Up"
                onPress={signUpUser}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default CreateAccountScreen;
