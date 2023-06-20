import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import colours from "../constants/colours";

export default function Header() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("HomepageScreen")}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-local-link.png")}
          resizeMode="contain"
        ></Image>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10,
    height: 40,
    backgroundColor: colours.primary,
  },
  logo: {
    width: 90,
    height: 70,
    marginTop: -18,
  },
});
