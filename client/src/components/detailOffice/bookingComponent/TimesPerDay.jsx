import { format, isBefore, isSameDay, isWithinInterval, set } from "date-fns";
import React from "react";
import { getTimes } from "./getTimesForDay";

const TimesPerDay = ({
  selectedDate,
  setSelectedStartTime,
  setSelectedEndTime,
  selectedStartTime,
  selectedEndTime,
  bookingData,
}) => {
  const myBookedWithStatusDiterima = bookingData?.filter(
    (item) => item.statusDiterima === true
  );
  const jamPerHari = getTimes(selectedDate);

  const isTimeDisabled = (time) => {
    if (!selectedDate) return false;

    const isSameDate = isSameDay(selectedDate, time);

    if (selectedStartTime && selectedEndTime) {
      const timeWithSelectedDate = set(selectedDate, {
        hours: time.getHours(),
        minutes: time.getMinutes(),
      });

      const selectedStartTimeWithDate = set(selectedDate, {
        hours: selectedStartTime.getHours(),
        minutes: selectedStartTime.getMinutes(),
      });

      let adjustedEndTimeWithDate = set(selectedDate, {
        hours: selectedEndTime.getHours(),
        minutes: selectedEndTime.getMinutes(),
      });

      // Check if endTime is earlier than startTime and adjust it
      if (isBefore(adjustedEndTimeWithDate, selectedStartTimeWithDate)) {
        adjustedEndTimeWithDate = selectedStartTimeWithDate;
      }

      if (
        isSameDate &&
        isBefore(selectedStartTimeWithDate, adjustedEndTimeWithDate)
      ) {
        // Ensure the interval is valid before checking
        if (
          isWithinInterval(timeWithSelectedDate, {
            start: selectedStartTimeWithDate,
            end: adjustedEndTimeWithDate,
          })
        ) {
          return true;
        }
      }
    }

    // Periksa data waktu yang telah dipesan
    for (const bookedTime of myBookedWithStatusDiterima) {
      const startTime = new Date(bookedTime.startTime);
      const endTime = new Date(bookedTime.endTime);

      endTime.setHours(endTime.getHours());

      if (isWithinInterval(time, { start: startTime, end: endTime })) {
        return true;
      }
    }

    return false;
  };

  const handleStartTimeClick = (time) => {
    if (isTimeDisabled(time)) {
      return;
    }
    setSelectedStartTime(time);
  };

  const handleEndTimeClick = (time) => {
    if (isTimeDisabled(time)) {
      return;
    }
    setSelectedEndTime(time);
  };

  return (
    <div>
      <h1 className="mx-auto font-bold text-xl text-center">Jam Tersedia</h1>
      {jamPerHari.map((time, i) => (
        <div key={i}>
          <input
            type="text"
            value={format(time, "kk:mm")}
            readOnly
            onClick={() => {
              if (!selectedStartTime) {
                handleStartTimeClick(time);
              } else if (!selectedEndTime) {
                handleEndTimeClick(time);
              }
            }}
            className={
              selectedStartTime === time
                ? "selected cursor-pointer h-5 py-2 my-3 rounded-md bg-gray-500 text-center mx-2 start-time"
                : selectedEndTime === time
                ? "selected cursor-pointer h-5 py-2 my-3 rounded-md text-center mx-2 bg-black end-time"
                : isTimeDisabled(time)
                ? "disabled-time h-5 py-2 my-3 rounded-md text-center mx-2"
                : "bg-blue-500 cursor-pointer h-5 py-2 my-3 rounded-md text-center mx-2 text-white"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default TimesPerDay;
