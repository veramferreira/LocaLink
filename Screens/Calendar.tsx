import { useQueryClient } from "react-query";
import { Calendar } from "react-native-calendars";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import getEvent from "../comp/getEvent";
import getEventTime from "../comp/getEventTime";
import colours from "../constants/colours";
import AddEvent from "./AddEvent";

const CalendarScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDayPress = (day) => {
    console.log(day.dateString);
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
        events.map((event, index) => (
          <View key={index}>
            <Text>{event.eventName}</Text>
            <Text>{eventTime[index]}</Text>
          </View>
        ))
      )}
      <View style={{ margin: 20 }}>
        <Button title="Add Event" onPress={handleAddEvent} />
      </View>
    </>
  );
};

export default CalendarScreen;
