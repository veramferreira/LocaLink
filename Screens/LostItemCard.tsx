import React from "react";
import { Text, View, StyleSheet, Image, Linking, Button } from "react-native";

const LostItemCard: React.FC<{ route: any }> = ({ route }) => {
  const { item } = route.params;
  const { itemName, photoUrl, description, date, contactEmail } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{itemName}</Text>
      <Image source={{ uri: photoUrl }} style={styles.itemImage} />
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={contactEmail}>{item.contactEmail}</Text>
      <Button
        onPress={() => Linking.openURL(`mailto:${contactEmail}`)}
        title="Contact me"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 5,
  },
  date: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 5,
  },
  contactEmail: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LostItemCard;
