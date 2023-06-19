import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { auth } from "../config/firebase";

interface LogOutCompProps {
  onLogout: () => Promise<void>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const LogOutComp: React.FC<LogOutCompProps> = ({ onLogout }) => {
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    setReRender(true);
  }, [reRender]);
  const handleLogout = async () => {
    try {
      await auth.signOut();

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
