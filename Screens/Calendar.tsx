import { useQueryClient } from "react-query";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Button, Text } from "react-native";
import colors from "../constants/colours";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import getEvent from "../comp/getEvent";
const CalendarScreen = () => {
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  console.log(getEvent(selectedDate));
  const setEventToday: any = getEvent(selectedDate);
  console.log(setEventToday);

  return (
    <>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "orange",
          },
        }}
      />
      {typeof setEventToday === "object" ? (
        <Text></Text>
      ) : (
        <Text>{setEventToday}</Text>
      )}
    </>
  );
};

export default CalendarScreen;
