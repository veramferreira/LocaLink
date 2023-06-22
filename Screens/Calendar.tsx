import { useQueryClient } from "react-query";
import { Calendar } from "react-native-calendars";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import getEvent from "../comp/getEvent";
import getEventTime from "../comp/getEventTime";
import colours from "../constants/colours";
import AddEvent from "./AddEvent";
import React from "react";

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

const CalendarScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [isButtonPressed, setButtonPressed] = useState<boolean>(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
    null
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedEventIndex(null);
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
    navigation.navigate("AddEvent", {});
  };

  const handleEventDescriptionPress = (eventIndex: number) => {
    setSelectedEventIndex((prevIndex) =>
      prevIndex === eventIndex ? null : eventIndex
    );
  };

  return (
    <>
      <ScrollView scrollIndicatorInsets={{right: 1}}>
        <Text style={styles.heading}>Community Calendar</Text>
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
                <React.Fragment key={index}>
                  <View style={styles.eventItem}>
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
                        onPress={() => handleEventDescriptionPress(index)}
                      >
                        <Text style={styles.boldText}>{eventName}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {selectedEventIndex === index && (
                    <View style={styles.eventDescription}>
                      <Text style={styles.normalText}>{description}</Text>
                    </View>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  h2: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,

    borderRadius: 5,
    padding: 10,
  },
  h2Text: {
    color: colours.secondary,
    fontFamily: "Poppins_500Medium",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: colours.secondary,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: colours.secondary,
    fontFamily: "Poppins_500Medium",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  eventItem: {
    flexDirection: "row",
    width: "100%",
  },
  eventTime: {
    backgroundColor: colours.primary,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Poppins_500Medium",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  eventName: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 5,
    width: "76%",
    fontFamily: "Poppins_500Medium",
  },
  text: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  eventDetails: {
    flexDirection: "row",
    fontFamily: "Poppins_400Regular",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  eventDescription: {
    marginLeft: "22%",
    marginRight: "5%",
    borderColor: colours.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    fontFamily: "Poppins_400Regular",
  },
  noEvents: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  normalText: {
    fontFamily: "Poppins_400Regular",
  },
  boldText: {
    fontFamily: "Poppins_500Medium",
  },
});
