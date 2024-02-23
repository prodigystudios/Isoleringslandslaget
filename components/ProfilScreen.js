import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from './firebase';

const ProfilScreen = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Assuming you have already initialized Firebase in your app
        const currentUser = FIREBASE_AUTH.currentUser;
        currentUser.displayName = "william ali";
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        FIREBASE_AUTH.signOut()
            .then(() => {
                setUser(null);
                console.log('User logged out successfully');
            })
            .catch((error) => {
                console.log('Error logging out:', error);
            });
    };

    return (
        <View>
            <Text>Welcome, {user ? user.displayName : 'Guest'}</Text>
            {/* Add more profile information here */}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default ProfilScreen;
