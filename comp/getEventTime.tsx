import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fromUnixTime, format } from "date-fns";
import { db } from "../config/firebase";

const getEventTime = (date) => {
  const [calendarEventTime, setCalendarEventTime] = useState([{}]);
  const [currentCalendarEvent, setCurrentCalendarEvent] = useState([{}]);
  useEffect(() => {
    const q = query(collection(db, "calendarEvent"), orderBy("timestamp"));

    const calendarEventArrQuery = onSnapshot(q, (querySnapshot) => {
      let calendarEventArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        calendarEventArr.push({ ...doc.data(), id: doc.id });
      });
      const newCalObj = calendarEventArr.map((elm) => {
        const fromUnix = fromUnixTime(elm.timestamp.seconds);
        const formatDate = format(fromUnix, "yyyy-MM-dd");
        const formatTime = format(fromUnix, "Hmm");

        const formDateString = formatDate.toString();
        const formTimeString = formatTime.toString();
        const eventName = elm.name;
        return { formDateString, eventName, formTimeString };
      });

      const matchedDates = newCalObj.map((elm) => {
        if (elm.formDateString === date) {
          return elm.formTimeString;
        }
        //make this map a filter ^^^
      });
      const eventToday = matchedDates.filter((elm) => {
        if (elm !== undefined) {
          return elm;
        }
      });
      eventToday.toString();
      setCurrentCalendarEvent(eventToday);
      setCalendarEventTime(calendarEventArr);
    });
    return () => calendarEventArrQuery();
  }, [date]);

  return currentCalendarEvent;
};
export default getEventTime;
