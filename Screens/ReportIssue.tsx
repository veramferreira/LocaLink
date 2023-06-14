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
import * as yup from "yup";

interface FormValues {
  title: string;
  description: string;
  email: string;
}

const formSchema = yup.object({
  title: yup.string().required().min(4),
  description: yup.string().required().min(4),
  email: yup.string().email().required(),
});

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text style={styles.heading}>Report an Issue</Text>
        <Formik
          initialValues={{ title: "", description: "", email: "" }}
          validationSchema={formSchema}
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
                // multiline
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
