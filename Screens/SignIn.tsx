import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignIn from "../comp/singInComp";
import LogOutComp from "../comp/logOutComp";
import { auth } from "../config/firebase";

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#333",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    color: "white",
    fontSize: 24,
  },
});

const SignInPage: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.nav}>
      {user ? (
        <LogOutComp onLogout={handleLogout} />
      ) : (
        <SignIn onSignIn={() => setUser(auth.currentUser)} />
      )}
    </View>
  );
};

export default SignInPage;
