import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { auth } from "../config/firebase";
import { MyContext } from "../Context";
interface LogOutCompProps {
  onLogout: () => Promise<void>;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "crimson",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
  },
  wrapper: {
    // marginTop: "50%",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center"
  },
  text: {
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});

const LogOutComp: React.FC<LogOutCompProps> = ({ onLogout }) => {
  const { setUserContext } = useContext(MyContext);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserContext(undefined);
      onLogout();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Press button to logout</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogOutComp;
