<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue'
import TopNav from '@/shared/presentation/components/TopNav.vue'
import LocationBadge from '@/shared/presentation/components/LocationBadge.vue'
import MapEmbed from '@/shared/presentation/components/MapEmbed.vue'

const address = ref('Obteniendo ubicación...')
const isLoading = ref(true)
let watchId = null // Para guardar el ID del watcher y poder limpiarlo después

// Función para obtener la dirección desde coordenadas usando Geocoding API
const getAddressFromCoords = async (lat, lng) => {
  try {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'BusTrack App'
          }
        }
    )
    const data = await response.json()

    if (data && data.display_name) {
      return data.display_name
    }
    return 'Ubicación no disponible'
  } catch (error) {
    console.error('Error al obtener dirección:', error)
    return 'Error al obtener ubicación'
  }
}

// Función para rastrear ubicación en tiempo real
const trackLocation = () => {
  if ('geolocation' in navigator) {
    // watchPosition se ejecuta cada vez que cambia la ubicación
    watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          console.log('Nueva ubicación:', latitude, longitude)
          const locationAddress = await getAddressFromCoords(latitude, longitude)
          address.value = locationAddress
          isLoading.value = false
        },
        (error) => {
          console.error('Error al obtener ubicación:', error)
          // Si falla, usar ubicación por defecto
          address.value = 'UPC - Campus San Miguel, Av. de la Marina 2810, San Miguel 15087'
          isLoading.value = false
        },
        {
          enableHighAccuracy: true, // Usa GPS de alta precisión
          maximumAge: 0, // No usar caché de ubicación
          timeout: 5000 // Timeout de 5 segundos
        }
    )
  } else {
    // Si el navegador no soporta geolocalización
    address.value = 'UPC - Campus San Miguel, Av. de la Marina 2810, San Miguel 15087'
    isLoading.value = false
  }
}

onMounted(() => {
  trackLocation()
})

// Limpiar el watcher cuando se desmonte el componente
onUnmounted(() => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId)
  }
})
</script>

<template>
  <div class="page">
    <TopNav />

    <main class="wrap">
      <h2 class="section-title">UBICACIÓN ACTUAL</h2>

      <div class="center">
        <LocationBadge :text="isLoading ? 'Obteniendo ubicación...' : address" />
      </div>

      <section class="map-section">
        <MapEmbed v-if="!isLoading" :q="address" :height="420" />
        <div v-else class="loading-map">
          <p>Cargando mapa...</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0;
  padding: 0;
  position: relative;
  left: 0;
  right: 0;
}

.wrap {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 16px 48px;
  flex: 1;
}

.section-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: #333;
  margin: 0 0 20px;
}

.center {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.map-section {
  margin-top: 0;
}

.loading-map {
  width: 100%;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 12px;
  color: #666;
}

.map-section :deep(.map-wrap) {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
  aspect-ratio: 16 / 9;
}

.map-section :deep(iframe) {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 768px) {
  .wrap {
    padding: 24px 12px 32px;
  }

  .section-title {
    font-size: 18px;
  }

  .map-section :deep(.map-wrap) {
    aspect-ratio: 4 / 3;
  }
}
</style>