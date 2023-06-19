import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fromUnixTime, format } from "date-fns";
import { db } from "../config/firebase";

interface CalendarEvent {
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

  useEffect(() => {
    const q = query(collection(db, "calendarEvent"));

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
  console.log(currentCalendarEvent);
  return currentCalendarEvent;
};
// const getEvent = (date: string): CalendarEvent[] => {
//   const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);
//   const [currentCalendarEvent, setCurrentCalendarEvent] = useState<
//     CalendarEvent[]
//   >([]);

//   useEffect(() => {
//     const q = query(collection(db, "calendarEvent"), orderBy("timestamp"));

//     const calendarEventArrQuery = onSnapshot(q, (querySnapshot) => {
//       let calendarEventArr: CalendarEvent[] = [];

//       querySnapshot.forEach((doc) => {
//         const elm = doc.data();
//         const fromUnix = fromUnixTime(elm.timestamp.seconds);
//         const formatDate = format(fromUnix, "yyyy-MM-dd");
//         const formatTime = format(fromUnix, "Hmm");
//         const formDateString = formatDate.toString();
//         const eventName = elm.name;
//         const formatTimeString = formatTime.toString();
//         calendarEventArr.push({ formDateString, eventName, formatTimeString });
//       });

//       const matchedDates = calendarEventArr.filter(
//         (elm) => elm.formDateString === date
//       );
//       setCurrentCalendarEvent(matchedDates);
//       setCalendarEvent(calendarEventArr);
//     });

//     return () => calendarEventArrQuery();
//   }, [date]);

//   return currentCalendarEvent;
// };

export default getEvent;
