export const getWeekDay = (years) => {
  const weekdays = [];
  let currentDay = new Date();
  const futureDate = new Date(currentDay);
  futureDate.setFullYear(currentDay.getFullYear() + years);

  while (currentDay < futureDate) {
    currentDay.setDate(currentDay.getDate() + 1);

    // Periksa apakah hari ini adalah hari kerja (Senin hingga Jumat)
    if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) {
      weekdays.push(new Date(currentDay));
    }
  }

  return weekdays;
};
