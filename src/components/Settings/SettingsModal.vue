<template>
  <article v-if="isOpen" class="settings-modal">
    <section class="settings-modal__inner">
      <article class="settings-modal__header">
        <h3>Settings</h3>
        <button @click="$emit('closeModal')">X</button>
      </article>
      <article class="settings-modal__body">
        <section class="settings-modal__time settings-modal__section">
          <h4 class="settings-modal__sub">Time (Minutes)</h4>
          <SettingsTimeSelectors />
        </section>
        <section
          class="settings-font settings-modal__section inline-grid__parent"
        >
          <h4 class="settings-modal__sub">Font</h4>
          <div class="settings-modal__fonts inline-grid__child">
            <button
              class="settings__ball"
              :class="{ 'settings__ball--isActive': fontTheme === 'kumbh' }"
              @click="() => setFont('kumbh')"
            >
              Aa
            </button>
            <button
              class="settings__ball"
              :class="{ 'settings__ball--isActive': fontTheme === 'roboto' }"
              @click="() => setFont('roboto')"
            >
              Aa
            </button>
            <button
              class="settings__ball"
              :class="{ 'settings__ball--isActive': fontTheme === 'space' }"
              @click="() => setFont('space')"
            >
              Aa
            </button>
          </div>
        </section>
        <section
          class="settings-colour settings-modal__section inline-grid__parent"
        >
          <h4 class="settings-modal__sub">Colour</h4>
          <div class="settings-modal__fonts inline-grid__child">
            <button
              class="settings__ball settings__ball--colour-red"
              :class="{
                'settings__ball--colour-isActive': colourTheme === 'red',
              }"
              @click="() => setSelectedColour('red')"
            ></button>
            <button
              class="settings__ball settings__ball--colour-blue"
              :class="{
                'settings__ball--colour-isActive': colourTheme === 'blue',
              }"
              @click="() => setSelectedColour('blue')"
            ></button>
            <button
              class="settings__ball settings__ball--colour-purple"
              :class="{
                'settings__ball--colour-isActive': colourTheme === 'purple',
              }"
              @click="() => setSelectedColour('purple')"
            ></button>
          </div>
        </section>
        <aside class="settings-modal__button-container">
          <BaseButton
            @buttonClicked="$emit('closeModal')"
            :theme="colourTheme"
            text="Apply"
          />
        </aside>
      </article>
    </section>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../../store/settingsStore";
import SettingsTimeSelectors from "./SettingsTimeSelectors.vue";
import BaseButton from "../utilities/BaseButton.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["closeModal"]);

const store = useSettingsStore();

const { fontTheme, colourTheme } = storeToRefs(store);

const setFont = (newFont) => {
  fontTheme.value = newFont;
};

const setSelectedColour = (newColour) => {
  colourTheme.value = newColour;
  store.setColourUsed(newColour);
};
</script>

<style>
.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
}

.settings-modal__inner {
  background: white;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  place-self: center;
  border-radius: 2rem;
}

.settings-modal__header {
  padding: 2rem;
  border-bottom: 1px solid #eff1fa;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.settings-modal__header > h3 {
  margin: 0;
  line-height: auto;
  text-align: left;
}

.settings-modal__header > button {
  max-width: fit-content;
  margin-left: auto;
  display: block;
}

.settings-modal__body {
  padding: 1rem 2rem 2.75rem 2rem;
  position: relative;
}

.settings-modal__sub {
  color: #161932;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 5px;
  width: fit-content;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.settings__ball {
  border-radius: 100%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(22, 25, 50, 0.9);
  position: relative;
}

.settings-modal__section:not(:nth-child(3)) {
  border-bottom: 1px solid #eff1fa;
  padding: 1rem 0;
}

.settings-modal__section {
  padding: 1rem 0;
}

.settings-font .settings-modal__sub {
  margin-bottom: 0;
}

.settings__ball--isActive {
  background: #161932;
  color: #eff1fa;
}

.inline-grid__child {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
}

.inline-grid__parent {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
}

.settings__ball--colour-red {
  background-color: #f87070;
}

.settings__ball--colour-blue {
  background-color: #70f3f8;
}

.settings__ball--colour-purple {
  background-color: #d881f8;
}

.settings__ball--colour-isActive:after {
  content: "X";
  position: absolute;
}

.settings-modal__button-container {
  position: absolute;
  bottom: -25px;
  left: 0;
  width: 100%;
}
</style>
