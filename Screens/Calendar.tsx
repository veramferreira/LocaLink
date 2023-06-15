import { useQueryClient } from "react-query";
import { Calendar } from "react-native-calendars";
import { Button, Text, View } from "react-native";
import colors from "../constants/colours";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import getEvent from "../comp/getEvent";
import getEventTime from "../comp/getEventTime";

const CalendarScreen = () => {
  const queryClient = useQueryClient();

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
      selectedColor: "orange",
    },
  };

  const events = getEvent(selectedDate);
  const eventTime = getEventTime(selectedDate);

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
    </>
  );
};

export default CalendarScreen;
