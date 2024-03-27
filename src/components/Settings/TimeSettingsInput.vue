<template>
  <article class="time-setting-input">
    <label
      class="timer-setting-input__label"
      :for="`timer-setting-input-${timerName}`"
    >
      {{ label }}</label
    >
    <input
      type="number"
      class="time-setting-input__input"
      v-model="timerValue"
      :min="minVal"
      :max="maxVal"
      :value="timerValue"
      @change="(e) => updateTimer(e, timerName)"
    />
  </article>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTimerStore } from "../../store/timesStore";

const store = useTimerStore();

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  minVal: {
    type: Number,
    default: 0,
  },
  maxVal: {
    type: Number,
    default: 0,
  },
});

const timerValue = ref(props.minVal);

const timerName = computed(() => {
  return props.label.replace(/ /g, "");
});

const updateTimer = (e, timerName) => {
  timerValue.value = e.target.value;

  store.setTimes(timerName, timerValue.value);
};
</script>

<style>
.time-setting-input {
  text-align: left;
}

.timer-setting-input__label {
  display: block;
  font-size: 0.8rem;
  color: #9d9da0;
  font-weight: bold;
}

.time-setting-input__input {
  border: none;
  border-radius: 10px;
  background-color: #eff1fa;
  padding: 1rem 1rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
