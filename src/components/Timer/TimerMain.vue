<template>
  <article class="timer-main">
    <TimerNavigation :colour="colourUsed" @navChanged="handleNavChanged" />
    <section class="timer-main__outer">
      <div class="timer-main__inner">
        <section :class="`timer-main__time ${fontTheme.value}-500`">
          <TimerRing
            :progress="percentageFinished"
            :size="ringSize"
            :strokeWidth="10"
            :color="colourUsed"
            class="timer-main__timer-ring"
          >
            <template #default>
              <div class="timer-main__timer-ring-content">
                <span>{{ timerValue }}</span>
                <button
                  :class="`timer-main__btn ${fontTheme}-700`"
                  @click="handleTimer"
                >
                  {{ timerText }}
                </button>
              </div>
            </template>
          </TimerRing>
        </section>
      </div>
    </section>
  </article>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTimerStore } from "../../store/timesStore.js";
import { useSettingsStore } from "../../store/settingsStore";
import TimerNavigation from "../Timer/TimerNavigation.vue";
import TimerRing from "./TimerRing.vue";

const store = useTimerStore();
const settings = useSettingsStore();
const { times } = storeToRefs(store);
const { colourUsed, fontTheme } = storeToRefs(settings);
const timerText = ref("start");
const timerActive = ref(false);
const selectedTimeOption = ref("pomodoro");
const timerValue = ref(`${times.value[selectedTimeOption.value]}:00`);
const percentageFinished = ref("0");

const ringSize = ref(440);

let timerTimer = undefined;
let timeLeft = times.value.pomodoro * 60;

const handleTimer = () => {
  if (!timerActive.value) {
    if (timeLeft < 0) {
      timerValue.value = `${times.value.pomodoro}:00`;
      timeLeft = times.value.pomodoro * 60;
    }

    timerTimer = setInterval(updateTimer, 1000);
    timerText.value = "pause";
    timerActive.value = true;
  } else {
    clearInterval(timerTimer);
    timerText.value = "Start";
    timerActive.value = false;
  }
};

const updateTimer = () => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  timerValue.value = `${minutes}:${seconds}`;

  // Calculate percentage
  const totalTime = times.value[selectedTimeOption.value] * 60; // Total time in seconds
  const elapsedTime = totalTime - timeLeft;
  const percentage = (elapsedTime / totalTime) * 100;

  // Now you can use the percentage value as needed
  percentageFinished.value = percentage.toFixed(2);

  timeLeft--;

  if (timeLeft === -1) {
    timerText.value = "restart";
    clearInterval(timerTimer);
    timerActive.value = false;
  }
};

const handleNavChanged = (timerOption) => {
  clearInterval(timerTimer);
  const newOption = timerOption.replace(/ /g, "");
  selectedTimeOption.value = newOption;
  timerValue.value = `${times.value[newOption]}:00`;
  percentageFinished.value = "0";
  timerText.value = "Start";
  timerActive.value = false;
  timeLeft = times.value[newOption] * 60;
};

const handleResize = () => {
  const mobile = window.matchMedia("(max-width: 600px)").matches;
  const tablet = window.matchMedia("(max-width: 769px)").matches;
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const xtraSmall = window.matchMedia("(max-width: 401px)").matches;

  console.log(mobile, tablet, desktop);

  if (xtraSmall) {
    ringSize.value = 240;
    return;
  }

  if (tablet && !desktop && !mobile) {
    ringSize.value = 410;
  } else if (mobile && !desktop && tablet) {
    ringSize.value = 300;
  } else {
    ringSize.value = 440;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
</script>

<style>
.timer-main__outer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer-main__inner {
  margin: 3rem auto;
  color: #d7e0ff;
  font-size: 10rem;
  font-weight: bold;
}

.timer-main__time {
  position: relative;
  border-radius: 100%;
  box-shadow: -25px -25px 100px 0 rgba(39, 44, 73, 1),
    25px 0px 100px 0 rgba(39, 44, 73, 1);

  height: 472px;
  width: 472px;
  border-radius: 100%;
  padding: 2rem;
}

.timer-main__timer-ring-content {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.timer-main__time span {
  font-size: 6.25rem;
  text-align: center;
}

.timer-main__btn {
  background-color: transparent;
  color: inherit;
  font-size: 1.1rem;
  letter-spacing: 1rem;
  text-transform: uppercase;
  width: 100%;
  margin: 0 auto;
  align-self: baseline;
}

@media (max-width: 769px) {
  .timer-main__time {
    height: 430px;
    width: 430px;
    box-shadow: none;
  }

  .timer-main__time span {
    font-size: 5.25rem;
  }

  .timer-main__btn {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .timer-main__time {
    height: 340px;
    width: 340px;
    padding: 0.8rem;
  }

  .timer-main__time span {
    font-size: 5rem;
  }
}

@media (max-width: 401px) {
  .timer-main__time {
    height: 290px;
    width: 290px;
    padding: 0.8rem;
  }

  .timer-main__time span {
    font-size: 3.5rem;
    max-width: 75%;
    margin: 0 auto;
  }

  .timer-main__btn {
    font-size: 0.9rem;
    width: 50%;
    margin: 0 auto;
  }
}
</style>
