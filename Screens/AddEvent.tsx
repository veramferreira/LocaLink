import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Formik, FormikProps } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MyContext } from "../Context";

interface FormValues {
  eventName: string;
  description: string;
  date: string;
  time: string;
}

const formSchema = yup.object({
  eventName: yup.string().required().min(4),
  description: yup.string().required().min(4),
  date: yup.string().required(),
  time: yup.string().optional(),
});

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

const AddEvent: React.FC = () => {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const {userContext} = useContext(MyContext);

  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        eventName: values.eventName,
        description: values.description,
        date: values.date,
        time: values.time,
      };

      await addDoc(collection(db, `${userContext?.communityName}calendarEvent`), docData);
      resetForm();
      setSubmitted(true);
      showAlert();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const showAlert = () => {
    Alert.alert("Event Added", "The event has been added successfully.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Add Event</Text>
        <Formik
          initialValues={{ eventName: "", description: "", date: "" }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<FormValues>) => (
            <View style={styles.form}>
              <Text style={styles.text}>Event Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event name..."
                onChangeText={props.handleChange("eventName")}
                value={props.values.eventName}
                onBlur={props.handleBlur("eventName")}
              />
              <Text style={styles.errorText}>
                {props.touched.eventName && props.errors.eventName}
              </Text>
              <Text style={styles.text}>Description:</Text>
              <TextInput
                multiline
                minHeight={70}
                style={styles.input}
                placeholder="Enter event description..."
                onChangeText={props.handleChange("description")}
                value={props.values.description}
                onBlur={props.handleBlur("description")}
              />
              <Text style={styles.errorText}>
                {props.touched.description && props.errors.description}
              </Text>
              <Text style={styles.text}>Date:</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter event date..."
                onChangeText={props.handleChange("date")}
                value={props.values.date}
                onBlur={props.handleBlur("date")}
                onFocus={showDatePicker}
              />
              <Text style={styles.errorText}>
                {props.touched.date && props.errors.date}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  props.setFieldValue("date", date.toISOString().split("T")[0]);
                  hideDatePicker();
                }}
                textColor="#000000"
                onCancel={hideDatePicker}
              />
              <Text style={styles.text}>Time:</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter event time..."
                onChangeText={props.handleChange("time")}
                value={props.values.time}
                onBlur={props.handleBlur("time")}
                onFocus={showTimePicker} // Changed the onFocus handler to showTimePicker
              />
              <Text style={styles.errorText}>
                {props.touched.time && props.errors.time}
              </Text>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={(time) => {
                  const formattedTime = time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  props.setFieldValue("time", formattedTime);
                  hideTimePicker();
                }}
                textColor="#000000"
                onCancel={hideTimePicker}
              />
              <TouchableOpacity
                title="Add Event"
                onPress={props.handleSubmit}
                style={[
                  styles.button,
                  isButtonPressed ? buttonPressedStyle : null,
                ]}
                onPressIn={() => setButtonPressed(true)}
                onPressOut={() => setButtonPressed(false)}
                activeOpacity={1}
              >
                <Text style={styles.buttonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  form: {
    alignSelf: "stretch",
    margin: 10,
  },
  text: {
    marginLeft: 10,
    marginBottom: 10,
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
});

export default AddEvent;
