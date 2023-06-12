import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const routes: NavigationItem[] = [
  { id: 1, title: "About", screen: "About" },
  {
    id: 2,
    title: "ManagementAnnouncements",
    screen: "ManagementAnnouncements",
  },
  { id: 3, title: "ReportIssue", screen: "ReportIssue" },
  { id: 4, title: "Calendar", screen: "Calendar" },
  { id: 5, title: "LostFound", screen: "LostFound" },
  { id: 6, title: "Marketplace", screen: "Marketplace" },
  { id: 7, title: "Recommendations", screen: "Recommendations" },
];

export const HomepageScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLinkPress = (item: NavigationItem) => {
    navigation.push(item.screen);
  };

  const renderItem = ({ item }: { item: NavigationItem }) => (
    <TouchableOpacity
      onPress={() => handleLinkPress(item)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {routes.map((item) => (
        <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemTitle: {
    fontSize: 18,
  },
});
