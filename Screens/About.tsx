import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { auth } from "../config/firebase";


export default function About({ navigation }: any) {
  const [user, setUser] = useState<any>(auth.currentUser);
  
  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log(currentUser)
    setUser(currentUser)
  }, [])

  return (
    <>
      <Text style={styles.heading}>About {user?.community_name} </Text>
      <View>
        <Text style={styles.title}>Curiosities:</Text>
        <Text style={styles.title}>Useful Contacts:</Text>
        <Text style={styles.title}>Management:</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  title: {
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
});
