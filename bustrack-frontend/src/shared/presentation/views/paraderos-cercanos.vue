<template>
  <div class="paraderos-page">
    <div class="content">
      <h1>Paraderos Cercanos</h1>

      <div class="main-layout">
        <!-- Lista de Paraderos - IZQUIERDA -->
        <div class="paraderos-list">
          <div class="paradero-card" v-for="paradero in paraderos" :key="paradero.id">
            <div class="card-header">
              <h3>{{ paradero.name }}</h3>
              <span class="distance">{{ paradero.distance }}</span>
            </div>
            <div class="card-content">
              <p class="address">📍 {{ paradero.address }}</p>
              <div class="buses-section">
                <h4>Buses que pasan:</h4>
                <div class="buses-grid">
                  <span
                      v-for="ruta in paradero.routes"
                      :key="ruta"
                      class="bus-tag"
                  >
                    {{ ruta }}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-primary" @click="openDirections(paradero)">
                Cómo llegar
              </button>
              <button class="btn btn-secondary" @click="setNotification(paradero)">
                Notificar llegada
              </button>
            </div>
          </div>
        </div>

        <!-- Mapa - DERECHA (más grande y centrado) -->
        <div class="map-section" v-if="!loading">
          <GoogleMap
              :center="mapCenter"
              :markers="mapMarkers"
              :zoom="15"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Cargando paraderos cercanos...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import GoogleMap from '../components/GoogleMap.vue'

const paraderos = ref([])
const currentLocation = ref(null)
const loading = ref(true)

// Datos de ejemplo (mientras arreglamos la API)
const sampleData = {
  paraderos: [
    {
      id: "ns1",
      name: "Rafael Escardó",
      latitude: -12.083420,
      longitude: -77.075280,
      routes: ["201", "204", "1173", "1286", "OMB", "OM36"],
      distance: "150 m",
      address: "Av. La Marina 2810, San Miguel 15087"
    },
    {
      id: "ns2",
      name: "Hiraoka",
      latitude: -12.082560,
      longitude: -77.073890,
      routes: ["1275", "IMB"],
      distance: "500 m",
      address: "Av. La Marina 2350, San Miguel 15087"
    }
  ],
  currentLocation: {
    latitude: -12.084180,
    longitude: -77.077300,
    name: "UPC - Campus San Miguel"
  }
}

// Centro del mapa (UPC San Miguel)
const mapCenter = computed(() => ({
  lat: -12.084180,
  lng: -77.077300
}))

// Marcadores para el mapa
const mapMarkers = computed(() => {
  const markers = []

  // Marcador de ubicación actual
  markers.push({
    ...sampleData.currentLocation,
    name: "Tu ubicación",
    isCurrentLocation: true
  })

  // Marcadores de paraderos
  sampleData.paraderos.forEach(paradero => {
    markers.push({
      ...paradero,
      isCurrentLocation: false
    })
  })

  return markers
})

onMounted(async () => {
  try {
    // Usar datos de ejemplo por ahora
    paraderos.value = sampleData.paraderos
    currentLocation.value = sampleData.currentLocation

    // Pequeño delay para mostrar loading
    loading.value = false

  } catch (error) {
    console.error('Error:', error)
    // En caso de error, usar datos de ejemplo
    paraderos.value = sampleData.paraderos
    loading.value = false
  }
})

const openDirections = (paradero) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${paradero.latitude},${paradero.longitude}`
  window.open(url, '_blank')
}

const setNotification = (paradero) => {
  alert(`🔔 Notificación configurada para: ${paradero.name}`)
}
</script>

<style scoped>
.paraderos-page {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.content {
  max-width: 1400px;
  margin: 0 auto;
}

.content h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2em;
}

/* Layout principal - Paraderos a la izquierda, Mapa a la derecha */
.main-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  min-height: 700px;
}

/* Lista de paraderos - IZQUIERDA */
.paraderos-list {
  flex: 0 0 450px; /* Ancho fijo para los paraderos */
  margin-top: 20px; /* Baja un poco los paraderos */
}

/* Mapa - DERECHA (más grande y centrado) */
.map-section {
  flex: 1;
  height: 650px; /* Más alto */
  display: flex;
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  margin-top: 20px; /* Baja el mapa para centrarlo con los paraderos */
}

/* Asegurar que el mapa ocupe todo el espacio disponible */
.map-section >>> .google-map-container,
.map-section >>> .map-container,
.map-section >>> .map-fallback {
  height: 100% !important;
  width: 100% !important;
}

/* Tarjetas de paraderos */
.paradero-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #789c0a;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.3em;
}

.distance {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9em;
  font-weight: bold;
}

.address {
  color: #666;
  margin: 0 0 15px 0;
  font-size: 0.95em;
}

.buses-section h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1em;
}

.buses-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bus-tag {
  background: #e8f5e8;
  color: #2e7d32;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: bold;
  border: 1px solid #c8e6c9;
  font-size: 0.9em;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #1976d2;
  color: white;
}

.btn-primary:hover {
  background: #1565c0;
}

.btn-secondary {
  background: #789c0a;
  color: white;
}

.btn-secondary:hover {
  background: #677e08;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 10px;
  color: #666;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-layout {
    gap: 30px;
  }

  .paraderos-list {
    flex: 0 0 400px;
  }

  .map-section {
    height: 550px;
  }
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    gap: 20px;
    min-height: auto;
  }

  .paraderos-list {
    flex: none;
    width: 100%;
    margin-top: 0;
  }

  .map-section {
    flex: 1;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>