import React from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackButton from "../comp/BackButton";

const LostItemCard: React.FC<{ route: any }> = ({ route }) => {
  const { item } = route.params;
  const { itemName, photoUrl, description, date, contactEmail } = item;

  return (
    <>
      <BackButton path="LostItems" />

      <View style={styles.container}>
        <Text style={styles.heading}>{itemName}</Text>
        <Image source={{ uri: photoUrl }} style={styles.itemImage} />
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>Date: {date}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${contactEmail}`)}
          style={styles.button}
        >
          <Text style={styles.contactText}>Contact me</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  itemImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#F4C01D",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 5,
  },
  date: {
    fontFamily: "Poppins_400Regular",
    textAlign: "left",
    fontStyle: "italic",
    marginBottom: 5,
  },
  contactEmail: {
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
  contactText: {
    color: "white",
  },
  button: {
    width: "100%",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: "#1B73E7",
  },
});

export default LostItemCard;
