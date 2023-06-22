import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fromUnixTime, format } from "date-fns";
import { db } from "../config/firebase";
import { MyContext } from "../Context";

export interface CalendarEvent {
  date: string;
  eventName: string;
  time: string;
  description: string;
}

const getEvent = (date: string): CalendarEvent[] => {
  const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);
  const [currentCalendarEvent, setCurrentCalendarEvent] = useState<
    CalendarEvent[]
  >([]);
  const {userContext} = useContext(MyContext);

  useEffect(() => {
    const q = query(collection(db, `${userContext?.communityName}calendarEvent`));

    const calendarEventArrQuery = onSnapshot(q, (querySnapshot) => {
      let calendarEventArr: CalendarEvent[] = [];

      querySnapshot.forEach((doc) => {
        const elm = doc.data();
        calendarEventArr.push(elm);
      });

      const matchedDates = calendarEventArr.filter((elm) => elm.date === date);

      setCurrentCalendarEvent(matchedDates);
      setCalendarEvent(calendarEventArr);
    });

    return () => calendarEventArrQuery();
  }, [date]);
  return currentCalendarEvent;
};

export default getEvent;
