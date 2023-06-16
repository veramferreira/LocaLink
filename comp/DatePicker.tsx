import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
  },
});

interface DatePickerProps {
  onDateSelected: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateSelected }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    onDateSelected(date);
    hideDatePicker();
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Select Event Date"
        onFocus={showDatePicker}
        value={selectedDate ? selectedDate.toDateString() : ""}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="#000000"
      />
    </>
  );
};

export default DatePicker;
