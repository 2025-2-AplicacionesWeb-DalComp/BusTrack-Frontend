<script setup lang="js">
import CompanyTopNav from '@/shared/presentation/components/CompanyTopNav.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotificationsStore } from '@/stores/useNotificationsStore'

const { t } = useI18n()
const notificationsStore = useNotificationsStore()

const buses = ref([
  {
    id: 204,
    route: 'Miraflores - San Isidro',
    driver: 'Juan Pérez',
    lastUpdate: 2,
    status: 'on_time', // 'on_time', 'delayed', 'out_of_service'
    coordinates: { lat: -12.076, lng: -77.08 }
  },
  {
    id: 301,
    route: 'Surco - Centro',
    driver: 'Carlos Rodríguez',
    lastUpdate: 1,
    status: 'delayed',
    delayMinutes: 8
  },
  {
    id: 412,
    route: 'San Borja - Chorrillos',
    driver: 'Luis Torres',
    lastUpdate: 15,
    status: 'out_of_service'
  }
])

const isRefreshing = ref(false)

// Función para refrescar datos (Simulación con Notificación)
const refreshData = () => {
  isRefreshing.value = true

  // Simulamos una petición a API
  setTimeout(() => {
    isRefreshing.value = false
    notificationsStore.addNotification({
      type: 'success',
      messageKey: 'monitoring.updated', // Clave i18n
      priority: 'low',
      icon: '🔄'
    })
  }, 1000)
}

// Utilidad para obtener estilos según estado
const getStatusStyles = (status) => {
  const styles = {
    on_time: {
      card: 'border-green',
      badge: 'bg-green-100 text-green-800',
      dot: 'bg-green-500'
    },
    delayed: {
      card: 'border-yellow',
      badge: 'bg-yellow-100 text-yellow-800',
      dot: 'bg-yellow-500'
    },
    out_of_service: {
      card: 'border-red',
      badge: 'bg-red-100 text-red-800',
      dot: 'bg-red-500'
    }
  }
  return styles[status] || styles.on_time
}

// Utilidad para abrir mapa externo (Lógica similar a tu ejemplo)
const openExternalMap = () => {
  window.open('https://www.google.com/maps/search/?api=1&query=UPC+San+Miguel', '_blank')
}
</script>

<template>
  <div class="page">
    <CompanyTopNav />

    <main class="content">
      <!-- Aquí luego pondrán KPIs, tarjetas, gráficos, etc. -->
      <div class="monitoring-container">

        <div class="header-section">
          <h2 class="page-title">{{ t('monitoring.title') }}</h2>
          <button
              @click="refreshData"
              class="refresh-btn"
              :disabled="isRefreshing"
          >
            {{ isRefreshing ? t('monitoring.refreshing') : t('monitoring.refresh') }}
          </button>
        </div>

        <div class="content-grid">

          <div class="map-card">
            <div class="map-frame">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.666986967664!2d-77.08272992419403!3d-12.075486242270928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9665c1507bb%3A0x66c7e33527a05786!2sUPC%20-%20Campus%20San%20Miguel!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
              </iframe>

              <button @click="openExternalMap" class="expand-map-btn">
                ↗ {{ t('monitoring.expandMap') }}
              </button>
            </div>
          </div>

          <div class="buses-list">
            <div
                v-for="bus in buses"
                :key="bus.id"
                class="bus-card"
                :class="getStatusStyles(bus.status).card"
            >
              <div class="card-header">
                <h3 class="bus-id">Bus {{ bus.id }}</h3>

                <div class="status-badge" :class="getStatusStyles(bus.status).badge">
                  <span class="status-dot" :class="getStatusStyles(bus.status).dot"></span>
                  <span v-if="bus.status === 'delayed'">
                {{ t('monitoring.status.delayed', { minutes: bus.delayMinutes }) }}
              </span>
                  <span v-else>
                {{ t(`monitoring.status.${bus.status}`) }}
              </span>
                </div>
              </div>

              <div class="card-details">
                <div class="detail-row">
                  <span class="label">{{ t('monitoring.details.route') }}:</span>
                  <span class="value">{{ bus.route }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('monitoring.details.driver') }}:</span>
                  <span class="value">{{ bus.driver }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('monitoring.details.updated') }}:</span>
                  <span class="value">{{ bus.lastUpdate }} min</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Contenedor Principal */
.monitoring-container {
  padding: 1.5rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%); /* Mismo fondo que Alertas */
  font-family: sans-serif;
}

/* Header */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2e7d32; /* Verde BusTrack */
  font-family: serif;
  margin: 0;
}

.refresh-btn {
  background: #8bc34a;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #689f38;
  transform: translateY(-2px);
}

.refresh-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

/* Grid Layout */
.content-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* Mapa más ancho que la lista */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Mapa */
.map-card {
  background: white;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  height: 500px; /* Altura fija para el mapa */
}

.map-frame {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.expand-map-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: white;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;
}

/* Lista de Buses */
.buses-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bus-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 5px solid transparent; /* Para el borde de color */
}

.bus-card:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

/* Colores de Borde */
.border-green { border-left-color: #8bc34a; }
.border-yellow { border-left-color: #fdd835; }
.border-red { border-left-color: #e53935; }

/* Header de Tarjeta */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.bus-id {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  font-family: serif;
}

/* Badges de Estado */
.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Colores de texto y fondo para Badges (Tailwind style manual) */
.bg-green-100 { background-color: #dcedc8; }
.text-green-800 { color: #33691e; }
.bg-green-500 { background-color: #7cb342; }

.bg-yellow-100 { background-color: #fff9c4; }
.text-yellow-800 { color: #f57f17; }
.bg-yellow-500 { background-color: #fbc02d; }

.bg-red-100 { background-color: #ffcdd2; }
.text-red-800 { color: #b71c1c; }
.bg-red-500 { background-color: #e53935; }

/* Detalles */
.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.label {
  color: #757575;
  font-weight: 500;
}

.value {
  color: #212121;
  font-weight: 600;
  text-align: right;
}

/* Responsive */
@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .map-card {
    height: 300px;
  }
}
</style>
