<template>
  <div class="travel-history-container">
    <!-- Back button -->
    <button class="back-btn" @click="goBack">Back</button>

    <!-- Language selector -->
    <div class="language-selector">
      <select v-model="currentLocale" @change="changeLanguage">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>

    <!-- Title -->
    <h2 class="title">Travel History</h2>

    <!-- Cards container -->
    <div class="cards-container">
      <div
          v-for="(trip, index) in trips"
          :key="index"
          class="trip-card"
      >
        <div
            v-for="(stop, sIndex) in trip.stops"
            :key="sIndex"
            class="stop-item"
        >
          <div class="line">
            <div
                class="circle"
                :class="{ big: sIndex === 0 || sIndex === trip.stops.length - 1 }"
            ></div>
            <div v-if="sIndex !== trip.stops.length - 1" class="connector"></div>
          </div>

          <div class="stop-info">
            <span v-if="stop.bus" class="bus-code" :class="stop.busColor">
              {{ stop.bus }}
            </span>
            <span class="stop-text">{{ stop.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Current language state
const currentLocale = ref('en')

// Function to change language
const changeLanguage = () => {
  console.log('Changing language to:', currentLocale.value)
  localStorage.setItem('userLocale', currentLocale.value)
}

// Travel history data
const trips = [
  {
    stops: [
      { name: 'UPC - San Miguel Campus' },
      { name: 'On foot' },
      { name: 'Rafael Escardó Stop' },
      { bus: 'OM22', name: 'Santa María', busColor: 'orange' },
      { name: 'Cádiz' },
      { name: 'On foot' },
      { name: 'UPC - San Isidro Campus' }
    ]
  },
  {
    stops: [
      { name: 'UPC - San Isidro Campus' },
      { name: 'On foot' },
      { name: 'Cádiz' },
      { bus: '1272', name: 'San Ignacio', busColor: 'blue' },
      { name: 'La Encalada' },
      { name: 'On foot' },
      { name: 'UPC - Monterrico Campus' }
    ]
  }
]

const goBack = () => {
  router.back()
}

// Load saved language when component mounts
onMounted(() => {
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale) {
    currentLocale.value = savedLocale
  }
})
</script>

<style scoped>
.travel-history-container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-family: 'Georgia', serif;
  position: relative;
  min-height: 100vh;
  background-color: #f5f5f5;
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
  color: black;
  font-size: 1.8em;
  text-align: center;
  margin-bottom: 30px;
}

.cards-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.trip-card {
  background-color: black;
  padding: 20px;
  border-radius: 15px;
  width: 280px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stop-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20px;
}

.circle {
  width: 12px;
  height: 12px;
  background-color: #b7f52d;
  border-radius: 50%;
  flex-shrink: 0;
}

.circle.big {
  width: 20px;
  height: 20px;
  background-color: #b7f52d;
}

.connector {
  width: 2px;
  height: 25px;
  background-color: #b7f52d;
  flex-shrink: 0;
}

.stop-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.stop-text {
  font-size: 0.9em;
  line-height: 1.4;
}

.bus-code {
  padding: 3px 8px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  font-size: 0.8em;
  flex-shrink: 0;
}

.orange {
  background-color: #f57c00;
}

.blue {
  background-color: #0288d1;
}

/* Responsive */
@media (max-width: 600px) {
  .travel-history-container {
    padding: 20px;
  }

  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .trip-card {
    width: 100%;
    max-width: 320px;
  }

  .language-selector {
    position: static;
    align-self: flex-end;
    margin-bottom: 10px;
  }
}
</style>