import { useQueryClient } from "react-query";
import { Calendar } from "react-native-calendars";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import getEvent from "../comp/getEvent";
import getEventTime from "../comp/getEventTime";
import colours from "../constants/colours";
import AddEvent from "./AddEvent";

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

const CalendarScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [isButtonPressed, setButtonPressed] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: colours.primary,
    },
  };

  const events = getEvent(selectedDate);
  const eventTime = getEventTime(selectedDate);

  const handleAddEvent = () => {
    navigation.navigate("AddEvent");
  };

  return (
    <>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      {events.length === 0 ? (
        <Text>No events for selected date</Text>
      ) : (
        events.map(({ eventName, date, description, time }, index) => (
          <View key={index}>
            <Text>{eventName}</Text>
            <Text>{description}</Text>
            <Text>{date}</Text>
            <Text>{time}</Text>
          </View>
        ))
      )}
      <TouchableOpacity
        style={[styles.button, isButtonPressed ? buttonPressedStyle : null]}
        onPressIn={() => setButtonPressed(true)}
        onPressOut={() => setButtonPressed(false)}
        onPress={handleAddEvent}
        activeOpacity={1}
      >
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    </>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
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
});
