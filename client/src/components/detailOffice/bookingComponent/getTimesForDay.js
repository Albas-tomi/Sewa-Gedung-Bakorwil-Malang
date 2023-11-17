import { add, differenceInMinutes } from "date-fns";
// ===== MENDAPATKAN RANGE JAM YANG DIPILIH
export const getSelectedTimeRange = (selectedStartTime, selectedEndTime) => {
  if (selectedStartTime && selectedEndTime) {
    const diffInMinutes = differenceInMinutes(
      selectedEndTime,
      selectedStartTime
    );
    const hours = Math.floor(diffInMinutes / 60);
    return hours;
  } else {
    return "Belum ada waktu yang dipilih";
  }
};

// MENDAPATKAN JAM PADA HARI YANG DIPILIH ============
export const getTimes = (selectedDate) => {
  if (!selectedDate) return [];
  const startTime = new Date(selectedDate);
  startTime.setHours(8, 0);
  const endTime = new Date(selectedDate);
  endTime.setHours(16, 0);
  const interval = 60;

  const times = [];

  for (
    let time = startTime;
    time <= endTime;
    time = add(time, { minutes: interval })
  ) {
    times.push(time);
  }

  return times;
};
