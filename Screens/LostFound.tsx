import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colours from "../constants/colours.js";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const routes: NavigationItem[] = [
  { id: 1, title: "Looking for item", screen: "LostItems" },
  { id: 2, title: "Found an item", screen: "FoundItem" },
];

const LostFound: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLinkPress = (item: NavigationItem) => {
    navigation.navigate(item.screen);
  };

  const colours = ["#1B73E7", "#FF8A64"];

  const renderItem = ({ item }: { item: NavigationItem }) => {
    const backgroundColor = colours[item.id % colours.length];
    const itemContainer = {
      ...styles.itemContainer,
      backgroundColor,
    };

    return (
      <TouchableOpacity
        onPress={() => handleLinkPress(item)}
        style={itemContainer}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h2}> Choose an option: </Text>
      <View style={styles.containerList}>
        {routes.map((item) => (
          <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    marginTop: "40%",
  },

  h2: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },

  containerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    height: 120,
    width: "40%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});

export default LostFound;
