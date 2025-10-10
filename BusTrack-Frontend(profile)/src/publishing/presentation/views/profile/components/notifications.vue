<template>
  <div class="notifications-container">
    <!-- Back button -->
    <button class="back-btn" @click="goBack">{{ $t('notifications.back') }}</button>

    <!-- Language selector -->
    <div class="language-selector">
      <select v-model="currentLocale" @change="changeLanguage">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>

    <!-- Title -->
    <h2 class="title">{{ $t('notifications.title') }}</h2>

    <!-- Settings container -->
    <div class="settings-box">
      <div v-for="(setting, index) in notificationSettings" :key="index" class="setting-item">
        <span class="setting-label">{{ $t(`notifications.${setting.key}`) }}</span>

        <label class="switch">
          <input type="checkbox" v-model="setting.enabled" />
          <span class="slider"></span>
        </label>

        <span class="status-text">{{ setting.enabled ? $t('notifications.enabled') : $t('notifications.disabled') }}</span>
      </div>
    </div>

    <!-- Save button -->
    <button class="save-btn" @click="saveChanges">{{ $t('notifications.save') }}</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Current language state
const currentLocale = ref('en')

// Notification settings with translation keys
const notificationSettings = ref([
  { key: 'bus_arrival', enabled: true },
  { key: 'delays', enabled: true },
  { key: 'nearby_stops', enabled: true },
  { key: 'trip_start', enabled: false }
])

// Function to change language
const changeLanguage = () => {
  console.log('Changing language to:', currentLocale.value)
  localStorage.setItem('userLocale', currentLocale.value)
}

const goBack = () => {
  router.back()
}

const saveChanges = () => {
  console.log('Saved changes:', notificationSettings.value)
  alert($t('notifications.changes_saved'))
}

// Load saved settings when component mounts
onMounted(() => {
  const savedSettings = localStorage.getItem('notificationSettings')
  if (savedSettings) {
    notificationSettings.value = JSON.parse(savedSettings)
  }

  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale) {
    currentLocale.value = savedLocale
  }
})
</script>

<style scoped>
.notifications-container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-family: 'Georgia', serif;
  position: relative;
}

.back-btn {
  align-self: flex-start;
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
}

.back-btn:hover {
  background-color: #333;
}

.language-selector {
  position: absolute;
  top: 30px;
  right: 30px;
}

.language-selector select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 0.9em;
}

.title {
  text-align: center;
  color: #2e4d0e;
  font-size: 1.8em;
  margin-bottom: 30px;
}

.settings-box {
  background-color: #c6dd58;
  padding: 30px;
  border-radius: 15px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-label {
  font-size: 1.1em;
  color: #1c3207;
}

/* Custom switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1c3207;
  transition: 0.4s;
  border-radius: 25px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1c3207;
}

input:checked + .slider:before {
  transform: translateX(25px);
}

.status-text {
  font-size: 1em;
  font-weight: bold;
  color: #1c3207;
}

.save-btn {
  align-self: flex-end;
  background-color: black;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
}

.save-btn:hover {
  background-color: #333;
}

/* Responsive */
@media (max-width: 480px) {
  .settings-box {
    width: 100%;
  }
  .setting-item {
    flex-direction: column;
    gap: 10px;
  }
  .language-selector {
    position: static;
    align-self: flex-end;
    margin-bottom: 10px;
  }
}
</style>