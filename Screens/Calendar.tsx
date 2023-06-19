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
  const [selectedDescription, setDescription] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setDescription(null);
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
  const handleEventDescriptionPress = (description: string) => {
    setDescription((prevDescription) => (prevDescription ? null : description));
    // selectedEvent ? setSelectedEvent(false) : setSelectedEvent(true);
  };

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
      <View style={styles.wrapper}>
        {events.length === 0 ? (
          <View style={styles.noEvents}>
            <Text>No events for selected date</Text>
          </View>
        ) : (
          <>
            <View style={styles.h2}>
              <Text style={styles.h2Text}>Events on {events[0].date}</Text>
            </View>
            {events.map(({ eventName, date, description, time }, index) => (
              <View key={index} style={styles.eventItem}>
                <View style={styles.eventDetails}>
                  <View style={styles.eventTime}>
                    {time ? (
                      <Text style={styles.text}>{time}</Text>
                    ) : (
                      <Text style={styles.text}>All day</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.eventName}
                    onPress={() => handleEventDescriptionPress(description)}
                  >
                    <Text>{eventName}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {selectedDescription ? (
              <View style={styles.eventDescription}>
                <Text>{selectedDescription}</Text>
              </View>
            ) : null}
          </>
        )}
      </View>
    </>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  h2: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    // backgroundColor: colours.primary,
    borderRadius: 5,
    padding: 10,
  },
  h2Text: {
    color: colours.secondary,
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
    width: "100%",
    // padding: 10,
  },
  eventTime: {
    backgroundColor: colours.primary,
    borderRadius: 5,
    padding: 10,

    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  eventName: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: colours.additional,
    marginLeft: 10,
    borderRadius: 5,
    width: "76%",
  },
  text: {
    color: "white",
  },
  eventDetails: {
    flexDirection: "row",

    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  eventDescription: {
    marginLeft: "22%",
    borderColor: colours.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  noEvents: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
