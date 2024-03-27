<template>
  <article class="settings-time-selectors">
    <section
      v-for="(timer, i) in timers"
      :key="i"
      :class="`settings-time-selectors__${timer.label}`"
    >
      <TimeSettingsInput
        :label="timer.label"
        :minVal="timer.min"
        :maxVal="timer.max"
      />
    </section>
  </article>
</template>

<script setup>
import TimeSettingsInput from "./TimeSettingsInput.vue";

const timers = [
  {
    label: "pomodoro",
    min: 5,
    max: 25,
  },
  {
    label: "short break",
    min: 2,
    max: 5,
  },
  {
    label: "long break",
    min: 15,
    max: 30,
  },
];
</script>

<style>
.settings-time-selectors {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
}

.settings-time-selectors section:first-child {
  grid-column-start: 1;
  grid-column-end: 1;
}

.settings-time-selectors section:nth-child(2) {
  grid-column-start: 2;
  grid-column-end: 2;
}

.settings-time-selectors section:nth-child(3) {
  grid-column-start: 3;
  grid-column-end: 3;
}
</style>
