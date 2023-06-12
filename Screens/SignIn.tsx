import { Text, View, StyleSheet, Button } from "react-native";

export default function SignIn ({navigation}: any) {
    return (
        <Button
      title="Sign in"
      onPress={() =>
        navigation.navigate('SignUp', {name: 'Jane'})
      }
    />
    )
}

const styles = StyleSheet.create({
    sign_in: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });