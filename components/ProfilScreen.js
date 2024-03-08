import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from './firebase';

const ProfilScreen = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Assuming you have already initialized Firebase in your app
        const currentUser = FIREBASE_AUTH.currentUser;
        // Set the user in state
        // create fuction to set user
        
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        FIREBASE_AUTH.signOut()
            .then(() => {
                setUser(null);
                console.log('User logged out successfully');
            })
            .catch((error) => {ß
                console.log('Error logging out:', error);
            });
    };

    return (
        <View>
            <Text>Välkommen, {user ? user.displayName : 'Guest'}</Text>
            {/* Add more profile information here */}
            <Button title="Logga ut" onPress={handleLogout} />
        </View>
    );
};

export default ProfilScreen;
