import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { MyContext } from "../Context";
interface LogOutCompProps {
  onLogout: () => Promise<void>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "crimson",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
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
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  );
};

export default LogOutComp;
