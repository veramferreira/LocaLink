import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Formik, FormikProps } from "formik";
import { auth, db } from "../config/firebase";
import {
  doc,
  updateDoc,
} from "@firebase/firestore";
import * as yup from "yup";
import { MyContext } from "../Context";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
// setting type for TS
interface FormValues {
  userName: string;
}

// Setting the rules for form validation
const formSchema = yup.object({
  userName: yup.string().required().min(3),
});

//Setting the button colour when it's pressed
const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

export default function ProfileSetup({ navigation }: any) {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const { userContext, setUserContext } = useContext(MyContext);
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        userName: values.userName,
        email: auth.currentUser?.email,
      };
      const tempEmail = auth.currentUser?.email;
      const createUserRef = doc(db, "Users", `${tempEmail}`);
      await updateDoc(createUserRef, docData);
      console.log("User added!");
      resetForm();
      setSubmitted(true);
      showAlert();
      setUserContext({ ...userContext, userName: values.userName });
      navigation.navigate("FindCreate");
    } catch (error) {
      console.error("Error adding User: ", error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "User Created",
      "User Created",
      [{ text: "OK!", onPress: () => console.log("OK pressed") }],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Setup</Text>
        <Formik
          initialValues={{ userName: "" }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<FormValues>) => (
            <View style={styles.form}>
              <Text style={styles.text}>Username: </Text>
              <TextInput
                style={styles.input}
                placeholder="userName"
                onChangeText={(text) => props.handleChange("userName")(text)}
                value={props.values.userName}
                onBlur={props.handleBlur("userName")}
              />
              <Text style={styles.errorText}>
                {props.touched.userName && props.errors.userName}
              </Text>

              <TouchableOpacity
                title="submit!"
                onPress={props.handleSubmit}
                style={[
                  styles.button,
                  isButtonPressed ? buttonPressedStyle : null,
                ]}
                onPressIn={() => setButtonPressed(true)}
                onPressOut={() => setButtonPressed(false)}
                activeOpacity={1}
              >
                <Text style={styles.buttonText}>Submit!</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  form: {
    margin: 10,
  },
  text: {
    marginLeft: 10,
    marginBottom: 10,
  },
  optionalText: {
    color: "gray",
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 0,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: "#1B73E7",
  },
  buttonText: {
    color: "white",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 11,
  },
  textSubmitted: {
    textAlign: "center",
    margin: 20,
  },
});
