<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isEN = computed({
  get: () => locale.value === 'en',
  set: (v) => {
    locale.value = v ? 'en' : 'es'
    localStorage.setItem('lang', locale.value)
  }
})

function setLang(code) {
  locale.value = code
  localStorage.setItem('lang', code)
}
</script>

<template>
  <div class="lang-switch" role="group" aria-label="Language switcher">
    <button
        class="seg" :class="{ active: locale === 'en' }"
        type="button" @click="setLang('en')">
      EN
    </button>
    <button
        class="seg" :class="{ active: locale === 'es' }"
        type="button" @click="setLang('es')">
      ES
    </button>
    <!-- knob decorativo -->
    <div class="knob" :class="locale"></div>
  </div>
</template>

<style scoped>
.lang-switch{
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: darkolivegreen;
  border-radius: 999px;
  padding: 4px;
  min-width: 112px;
}
.seg{
  position: relative;
  z-index: 2;
  border: 0;
  background: transparent;
  color: white;
  font-weight: 800;
  letter-spacing: .5px;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
}
.seg.active{ color: #0c223a; }

.knob{
  position: absolute;
  z-index: 1;
  top: 4px; bottom: 4px;
  width: calc(50% - 4px);
  background: greenyellow;
  border-radius: 999px;
  transition: transform .2s ease;
}
.knob.en{ transform: translateX(4px); }
.knob.es{ transform: translateX(calc(100% + 4px)); }
</style>
