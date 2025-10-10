<template>
  <div class="google-map-container">
    <div ref="mapContainer" class="map-container" :class="{ 'map-hidden': !mapInitialized || error }"></div>

    <div v-if="!mapInitialized || error" class="map-fallback">
      <div class="fallback-content">
        <h3>🗺️ Paraderos Cercanos - UPC San Miguel</h3>

        <div class="fallback-map">
          <div class="map-location current">
            <div class="location-marker">📍</div>
            <div class="location-info">
              <strong>Tu ubicación actual</strong>
              <div>UPC Campus San Miguel</div>
              <small>Av. La Marina 2810</small>
            </div>
          </div>

          <div class="map-location stop" v-for="marker in props.markers" :key="marker.id">
            <div class="location-marker">🟢</div>
            <div class="location-info">
              <strong>{{ marker.name }}</strong>
              <div>{{ marker.distance }} - {{ marker.address }}</div>
              <div class="location-routes">
                <span v-for="ruta in marker.routes" :key="ruta" class="route-badge">{{ ruta }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="fallback-note" v-if="error">
          <p>⚠️ {{ error }}</p>
          <div class="debug-info">
            <p><strong>Para solucionar el error de Referer:</strong></p>
            <p>1. Ve a <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a>, Credenciales, y edita tu API Key.</p>
            <p>2. En "Restricciones de referente de sitio web", agrega la URL de tu entorno:</p>
            <code>http://localhost:5173/*</code><br>
            <code>http://localhost:3000/*</code>
          </div>
          <button @click="retryLoadMap" class="retry-button">🔄 Reintentar</button>
        </div>

        <div class="fallback-note" v-else>
          <p>🔄 Cargando mapa interactivo...</p>
          <p><small>Estado: {{ loadingStatus }}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  center: {
    type: Object,
    required: true,
    default: () => ({ lat: -12.0830, lng: -77.0829 })
  },
  markers: {
    type: Array,
    default: () => []
  },
  zoom: {
    type: Number,
    default: 15
  }
})

const mapContainer = ref(null)
const map = ref(null)
const error = ref('')
const mapInitialized = ref(false)
const loadingStatus = ref('Iniciando...')

const retryLoadMap = () => {
  error.value = ''
  mapInitialized.value = false
  initializeMap()
}

const initializeMap = () => {
  // Si ya está inicializado, no hacer nada
  if (mapInitialized.value) return

  // ⭐️ OBTENER API KEY DE VARIABLES DE ENTORNO
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    error.value = 'ERROR: No se encontró la API Key. Asegúrate de definir VITE_GOOGLE_MAPS_API_KEY en tu archivo .env'
    loadingStatus.value = 'Error: Clave no definida'
    console.error('❌ API Key de Google Maps no definida en .env')
    return
  }

  loadingStatus.value = 'Verificando Google Maps API...'

  // Función para cargar Google Maps
  const loadGoogleMaps = () => {
    // Si ya está cargado, inicializar directamente
    if (window.google && window.google.maps) {
      createMap()
      return
    }

    // Si no está cargado, cargar la API
    loadingStatus.value = 'Cargando Google Maps API...'

    const script = document.createElement('script')
    // ⭐️ USAR LA VARIABLE DE ENTORNO para la URL
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCFpc_-tpuXPCH5uvA1SxjnKCZadqG17H4`
    script.async = true
    script.defer = true

    script.onload = () => {
      loadingStatus.value = 'Google Maps cargado, creando mapa...'
      console.log('✅ Google Maps API cargada correctamente')
      createMap()
    }

    script.onerror = () => {
      error.value = 'No se pudo cargar Google Maps. Verifica tu conexión y API Key.'
      loadingStatus.value = 'Error cargando API'
      console.error('❌ Error cargando Google Maps API')
    }

    document.head.appendChild(script)
  }

  // Función para crear el mapa
  const createMap = () => {
    try {
      loadingStatus.value = 'Creando mapa...'

      if (!mapContainer.value) {
        error.value = 'Contenedor del mapa no encontrado'
        return
      }

      // Verificar que la API esté disponible
      if (!window.google || !window.google.maps) {
        throw new Error('Google Maps API no disponible')
      }

      // Crear el mapa
      map.value = new google.maps.Map(mapContainer.value, {
        center: props.center,
        zoom: props.zoom,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      })

      // Agregar marcadores
      if (props.markers && props.markers.length > 0) {
        props.markers.forEach(marker => {
          const lat = parseFloat(marker.latitude)
          const lng = parseFloat(marker.longitude)

          if (!isNaN(lat) && !isNaN(lng)) {
            new google.maps.Marker({
              position: { lat, lng },
              map: map.value,
              title: marker.name
            })
          }
        })
      }

      // Marcar como inicializado
      mapInitialized.value = true
      loadingStatus.value = '✅ Mapa listo'
      console.log('✅ Mapa de Google inicializado correctamente')

    } catch (err) {
      error.value = `Error creando el mapa: ${err.message}`
      loadingStatus.value = `Error: ${err.message}`
      console.error('❌ Error inicializando mapa:', err)

      // Detectar errores comunes de API Key (como RefererNotAllowedMapError)
      if (err.message.includes('InvalidKey') || err.message.includes('API key') || err.message.includes('referer')) {
        error.value = 'Problema con la API Key o restricciones de referer. Verifica que esté habilitada y tenga las URL correctas (http://localhost:5173/*) en Google Cloud Console.'
      }
    }
  }

  // Iniciar el proceso
  loadGoogleMaps()
}

onMounted(() => {
  // Pequeño delay para asegurar que el DOM esté listo
  setTimeout(() => {
    initializeMap()
  }, 100)
})

// Limpiar recursos si es necesario
onUnmounted(() => {
  if (map.value) {
    // Google Maps se limpia automáticamente cuando se elimina el elemento
  }
})
</script>

<style scoped>
/* Las estilos CSS están perfectos, no necesitan modificación */
.google-map-container {
  width: 100%;
  height: 400px;
  position: relative;
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
}

.map-hidden {
  display: none;
}

.map-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow-y: auto;
}

.fallback-content {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.fallback-content h3 {
  text-align: center;
  margin: 0 0 20px 0;
  color: #333;
}

.fallback-map {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.map-location {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background: #f8f9fa;
  border-left: 4px solid #789c0a;
  border-radius: 8px;
}

.map-location.current {
  border-left-color: #1976d2;
  background: #e3f5e8;
}

.location-marker {
  font-size: 1.5em;
  margin-right: 15px;
  margin-top: 2px;
}

.location-info {
  flex: 1;
}

.location-info strong {
  color: #333;
  display: block;
  margin-bottom: 4px;
}

.location-info div {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 2px;
}

.location-info small {
  color: #888;
  font-size: 0.8em;
}

.location-routes {
  margin-top: 8px;
}

.route-badge {
  background: #e8f5e8;
  color: #2e7d32;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8em;
  margin-right: 5px;
  border: 1px solid #c8e6c9;
  font-weight: bold;
}

.fallback-note {
  margin-top: auto;
  padding: 15px;
  background: #fff3e0;
  border-left: 4px solid #ffb74d;
  border-radius: 8px;
}

.fallback-note p {
  margin: 5px 0;
  color: #e65100;
  font-size: 0.9em;
}

.debug-info {
  margin: 10px 0;
}

.debug-info p {
  margin: 3px 0;
  color: #e65100;
  font-size: 0.85em;
}

.fallback-note code {
  background: #fff8e1;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8em;
  margin: 2px 0;
  display: inline-block;
}

.fallback-note a {
  color: #1976d2;
  text-decoration: none;
}

.fallback-note a:hover {
  text-decoration: underline;
}

.retry-button {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 0.9em;
  width: 100%;
}

.retry-button:hover {
  background: #1565c0;
}
</style>