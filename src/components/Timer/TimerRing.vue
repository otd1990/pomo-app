<template>
  <div style="position: relative">
    <svg class="progress-ring" :height="size" :width="size">
      <circle
        class="progress-ring__circle"
        :stroke="color"
        :stroke-width="strokeWidth"
        fill="transparent"
        :r="radius"
        :cx="center"
        :cy="center"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  progress: String,
  size: {
    type: Number,
    default: 480, // Default size
  },
  strokeWidth: {
    type: Number,
    default: 10, // Default stroke width
  },
  color: {
    type: String,
    default: "white", // Default color
  },
});

const radius = ref(0);
const center = ref(props.size / 2);
const circumference = ref(0);
const dashOffset = ref(0);

function setProgress(percent) {
  if (percent === 0) {
    dashOffset.value = circumference.value;
  } else {
    dashOffset.value =
      circumference.value - (percent / 100) * circumference.value;
  }
}

function circleSetup() {
  const minSize = props.strokeWidth * 2; // Minimum size based on stroke width

  // Ensure the size doesn't fall below the minimum
  props.size = Math.max(props.size, minSize);

  radius.value = props.size / 2 - props.strokeWidth / 2;
  circumference.value = 2 * Math.PI * radius.value;
  // Set initial progress
  setProgress(0);
}

onMounted(circleSetup);

watch(
  () => props.progress,
  (newValue, oldValue) => {
    setProgress(newValue);
  }
);
</script>

<style>
.progress-ring {
  box-shadow: 0 10px 25px 3px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  transform: rotate(-90deg);
  padding: 1rem;
}
.content {
  left: 50%;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  height: 100%;
}
</style>
