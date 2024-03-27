<template>
  <button
    :class="`base-button base-button--${theme}`"
    @click="$emit('buttonClicked')"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  theme: {
    type: String,
    default: "red",
  },
  text: {
    type: String,
    default: "",
  },
});

defineEmits(["buttonClicked"]);
</script>

<style>
.base-button {
  border-radius: 26px;
  font-size: 16px;
  color: #fff;
  padding: 0.75rem 2rem;
  max-width: 140px;
  width: 100%;
}

.base-button--red {
  background-color: #f87070;
}

.base-button--blue {
  background-color: #70f3f8;
}

.base-button--purple {
  background-color: #d881f8;
}
</style>
