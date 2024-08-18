import React, { useState, useEffect } from "react";

const GreetingSystem = (count) => {
  const [greeting, setGreeting] = useState("");
  // console.log(count);
  // console.log(count.totalCount);
  // console.log(count.completedCount);
  useEffect(() => {
    const getCurrentTimeOfDay = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return "Good morning 🌄";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon ☀️";
      } else if (currentHour >= 18 && currentHour < 19) {
        return "Good evening 🌇";
      } else {
        return "It's night 🌉";
      }
    };

    const generateGreeting = (timeOfDay) => {
      if (count.totalCount === 0 && count.completedCount === 0) {
        setGreeting(`${timeOfDay}, Yay no task yet. Everything looks good 😊`);
      } else if (count.totalCount > 0 && count.completedCount === 0) {
        setGreeting(
          `${timeOfDay}! You haven't completed any tasks. Let's get things done! 💪`
        );
      } else if (count.totalCount - count.completedCount === 0) {
        setGreeting(`${timeOfDay}! Well done, all tasks completed 👏`);
      } else if (count.totalCount - count.completedCount <= 5) {
        setGreeting(
          `${timeOfDay}! You've completed ${count.completedCount} tasks. Keep it up! 👍`
        );
      } else {
        setGreeting(
          `${timeOfDay}! Common hurry up, you need to complete ${
            count.totalCount - count.completedCount
          } tasks!`
        );
      }
    };

    const timeOfDay = getCurrentTimeOfDay();
    generateGreeting(timeOfDay);
  }, [count.completedCount, count.totalCount]);

  return (
    <div>
      <h2 className="m-4 py-2 font-semibold text-2xl justify-center md:p-2">
        {greeting}
      </h2>
    </div>
  );
};

export default GreetingSystem;
