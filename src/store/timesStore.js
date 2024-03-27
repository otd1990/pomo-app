import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTimerStore = defineStore("timer", () => {
  const times = reactive({
    pomodoro: 25,
    shortbreak: 5,
    longbreak: 15,
  });

  const selectedTimeOption = ref("pomodoro");

  function setTimes(timerName, time) {
    times[timerName] = parseInt(time);
  }

  function getTime(timerName) {
    return times[timerName];
  }

  function setSelectedTimerOption(timerName) {
    selectedTimeOption.value = timerName;
  }

  return {
    times,
    selectedTimeOption,
    setTimes,
    getTime,
    setSelectedTimerOption,
  };
});
