import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colours from "../constants/colours";
import { View, StyleSheet } from "react-native";

const BackButton: React.FC = ({ path }: { path: string }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => (path ? navigation.navigate(path) : navigation.goBack())}
    >
      <View style={styles.backButton}>
        <FontAwesome5
          name="chevron-left"
          size={20}
          color="white"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 4,
    marginLeft: 15,
    width: 30,
    height: 30,
    backgroundColor: "#F4C01D",
    borderRadius: 6
  },
  icon: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BackButton;
