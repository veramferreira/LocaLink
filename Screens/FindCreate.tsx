import { Button, View, Image } from "react-native";

export default function FindCreate({ navigation }: any) {
  return (
    <View>
      <Button
        title="Create a Community"
        onPress={() => navigation.navigate("CreateCommunity")}
      />
      <Button
        title="Find a Community"
        onPress={() => navigation.navigate("FindCommunity")}
      />
    </View>
  );
}
