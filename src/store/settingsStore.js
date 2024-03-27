import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const colours = {
    red: "#f87070",
    blue: "#70f3f8",
    purple: "#d881f8",
  };

  const fontTheme = ref("kumbh");
  const colourTheme = ref("red");
  const colourUsed = ref(colours[colourTheme.value]);

  function setColourUsed(colour) {
    colourUsed.value = colours[colour];
  }

  return { colourUsed, fontTheme, colourTheme, colours, setColourUsed };
});
