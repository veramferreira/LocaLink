import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fromUnixTime, format } from "date-fns";
import { db } from "../config/firebase";
import { MyContext } from "../Context";

interface CalendarEventTime {
  formDateString: string;
  formTimeString: string;
}
const getEventTime = (date: any) => {
  const [currentCalendarEvent, setCurrentCalendarEvent] = useState<
    CalendarEventTime[]
  >([]);
  const { userContext } = useContext(MyContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `${userContext?.userName}calendarEvent`), orderBy("timestamp")),
      (querySnapshot) => {
        const calendarEventArr: CalendarEventTime[] = [];

        querySnapshot.forEach((doc) => {
          const elm = doc.data();
          const fromUnix = fromUnixTime(elm.timestamp.seconds);
          const formatDate = format(fromUnix, "yyyy-MM-dd");
          const formatTime = format(fromUnix, "Hmm");
          const formDateString = formatDate.toString();
          const formTimeString = formatTime.toString();
          calendarEventArr.push({ formDateString, formTimeString });
        });

        const matchedDates = calendarEventArr.filter(
          (elm) => elm.formDateString === date
        );
        setCurrentCalendarEvent(
          matchedDates.map((event: any) => event.formTimeString)
        );
      }
    );

    return unsubscribe;
  }, [date]);

  return currentCalendarEvent;
};

export default getEventTime;
