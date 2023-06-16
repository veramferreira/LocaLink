import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

interface SignInCompProps {
  userList: {}[];
  onSignIn: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  switchText: {
    color: "blue",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

const SignIn: React.FC<SignInCompProps> = ({ onSignIn, userList }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleAuthAction = () => {
    setError("");

    if (email === "" || password === "") {
      setError("Please enter an email and password");
      return;
    }

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate("ProfileSetup");
          console.log("User creation successful");
        })
        .catch((error) => {
          setError(error.message);
          console.log("User creation error:", error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          let exist = false;
          console.log(userList);
          for (const user of userList) {
            if (user.email === email) {
              exist = true;
            }
          }

          console.log("Sign-in successful");
          onSignIn();
          if (!exist) {
            navigation.navigate("ProfileSetup");
          } else {
            navigation.navigate("HomepageScreen");
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log("Sign-in error:", error);
        });
    }
  };

  const toggleAuthAction = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <View style={styles.wrapper}>
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleAuthAction}>
        <Text style={styles.switchText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
