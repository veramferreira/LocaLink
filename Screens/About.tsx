import { Text, View, StyleSheet, Button } from "react-native";


export default function About({ navigation }: any) {
  return (
    <>
      <Text style={styles.heading}>About _COMMUNITY NAME_ </Text>
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
