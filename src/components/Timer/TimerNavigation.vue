<template>
  <article class="timer-navigation">
    <section
      v-for="(option, index) in timerOptions"
      :key="index"
      class="timer-navigation__item"
      :class="{ 'timer-navigation__item--active': activeOption === option }"
      :style="{ backgroundColor: activeOption === option ? colour : '' }"
      @click="activeTimer(option)"
      role="button"
      :aria-label="`Switch timer to ${option} ${
        activeOption === option ? 'this is the active item' : ''
      }`"
    >
      <span class="timer-navigation__item--text">
        {{ option }}
      </span>
    </section>
  </article>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  colour: {
    type: String,
    default: "white",
  },
});

const emit = defineEmits(["navChanged"]);

const activeOption = ref("pomodoro");
const timerOptions = ["pomodoro", "short break", "long break"];

const activeTimer = (timer) => {
  setTimeout(() => {
    activeOption.value = timer;
    emit("navChanged", timer);
  }, 50);
};
</script>

<style>
.timer-navigation {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 375px;
  margin: 0 auto;
  padding: 0.5rem;
  background-color: #161932;
  border-radius: 3rem;
}

.timer-navigation__item {
  max-width: 120px;
  text-align: center;
  padding: 0.75rem 1rem;
  color: #d7e0ff;
  border-radius: 3rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.timer-navigation__item--active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 3rem;
  animation: slideFromLeft 0.3s ease;
}

.navigation__item {
  z-index: 999;
}

.timer-navigation__item--active .timer-navigation__item--text {
  color: #1e213f;
  position: relative;
  z-index: 2;
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-100px);
  }
  to {
    transform: translateX(0);
  }
}

@media (max-width: 600px) {
  .timer-navigation {
    max-width: 100%;
    padding: 0 0.25rem;
  }

  .timer-navigation__item {
    padding: 0.75rem 0.5rem;
  }
}
</style>
