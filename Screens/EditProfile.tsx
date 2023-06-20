import { useContext } from "react";
import { MyContext } from "../Context";
import { Text, View } from "react-native";
export default function EditProfile() {
  const { userContext } = useContext(MyContext);
  return (
    <View>
      <Text>User name:{userContext.userName}</Text>
      <Text>Email:{userContext.email}</Text>
      <Text>Community:{userContext.communityName}</Text>
      <Text>Role:{userContext.role}</Text>
    </View>
  );
}
