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
  const handleEventDescriptionPress = (eventName) => {};

  return (
    <>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      <TouchableOpacity
        style={[styles.button, isButtonPressed ? buttonPressedStyle : null]}
        onPressIn={() => setButtonPressed(true)}
        onPressOut={() => setButtonPressed(false)}
        onPress={handleAddEvent}
        activeOpacity={1}
      >
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
      {events.length === 0 ? (
        <Text>No events for selected date</Text>
      ) : (
        <>
          <View style={styles.h2}>
            <Text style={styles.h2Text}>Events on {events[0].date}</Text>
          </View>
          {events.map(({ eventName, date, description, time }, index) => (
            <View key={index} style={styles.eventItem}>
              <View style={styles.eventTime}>
                {time ? (
                  <Text style={styles.text}>{time}</Text>
                ) : (
                  <Text style={styles.text}>All day</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => handleEventDescriptionPress(eventName)}
              >
                <Text style={styles.eventName}>{eventName}</Text>
              </TouchableOpacity>

              <Text>{description}</Text>
            </View>
          ))}
        </>
      )}
    </>
  );
};

export default CalendarScreen;

export default CalendarScreen;

const styles = StyleSheet.create({
  h2: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: colours.primary,
    borderRadius: 5,
    padding: 10,
  },
  h2Text: {
    color: "white",
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
  eventItem: {
    flexDirection: "row",
    margin: 15,
  },
  eventTime: {
    backgroundColor: colours.primary,
    borderRadius: 5,
    padding: 10,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  eventName: {
    padding: 10,
  },
  text: {
    color: "white",
  },
});
