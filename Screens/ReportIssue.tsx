import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { Formik, FormikProps } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection } from "@firebase/firestore";

interface FormValues {
  title: string;
  description: string;
  email: string;
}

export default function ReportIssue({ navigation }: any) {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        title: values.title,
        description: values.description,
        email: values.email,
      };

      await addDoc(collection(db, "reportedIssues"), docData);
      console.log("Document written successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Report an Issue</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{ title: "", description: "", email: "" }}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<FormValues>) => (
            <View style={styles.form}>
              <Text style={styles.text}>Title: </Text>
              <TextInput
                style={styles.input}
                placeholder="issue title..."
                onChangeText={(text) => props.handleChange("title")(text)}
                value={props.values.title}
              />
              <Text style={styles.form}>Issue Description: </Text>
              <TextInput
                style={styles.input}
                placeholder="describe the issue... "
                onChangeText={(text) => props.handleChange("description")(text)}
                value={props.values.description}
              />
              <Text style={styles.form}>Your email: </Text>
              <TextInput
                style={styles.input}
                placeholder="example@example.com "
                onChangeText={(text) => props.handleChange("email")(text)}
                value={props.values.email}
              />
              <TouchableOpacity
                title="submit!"
                onPress={props.handleSubmit}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Submit!</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
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
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 10,
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
    margin: 10,
    borderColor: "#1B73E7",
  },
  buttonText: {
    color: "white",
  },
});
