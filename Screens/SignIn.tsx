import { Text, View, StyleSheet, Button } from "react-native";
// import Google from "react-native-google-button";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import { auth } from "../config/firebase";
import { GoogleAuthProvider, signInWithRedirect, getAuth } from "firebase/auth";

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

export default function SignIn({ navigation }: any) {
  return <GoogleSigninButton onPress={googleSignIn} />;
}

const styles = StyleSheet.create({
  sign_in: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
