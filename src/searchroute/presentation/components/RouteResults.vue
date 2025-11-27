<script setup>
const props = defineProps({
  origin: String,
  destination: String,
  routeData: Object
})

const openInGoogleMaps = () => {
  // Crear URL para Google Maps con origen y destino
  const origin = encodeURIComponent(props.origin)
  const destination = encodeURIComponent(props.destination)
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`


  window.open(url, '_blank')
}

const copyAddress = (address) => {
  navigator.clipboard.writeText(address)
  alert('Dirección copiada al portapapeles')
}
</script>

<template>
  <div class="route-results">
    <div class="results-header">
      <h2>Información de tu viaje</h2>
    </div>

    <div class="address-card">
      <div class="address-item origin">
        <div class="label">
          <span class="marker">A</span>
          <span class="text">Origen</span>
        </div>
        <div class="address-content">
          <p>{{ origin }}</p>
        </div>
      </div>

      <div class="arrow-separator">
        ↓
      </div>

      <div class="address-item destination">
        <div class="label">
          <span class="marker">B</span>
          <span class="text">Destino</span>
        </div>
        <div class="address-content">
          <p>{{ destination }}</p>
        </div>
      </div>
    </div>

    <div class="info-box">
      <div class="info-icon">ℹ️</div>
      <div class="info-content">
        <p><strong>Para ver las rutas de buses disponibles:</strong></p>
        <p>Haz clic en el botón de abajo para abrir Google Maps y ver todas las opciones de transporte público, incluyendo líneas de buses, tiempos y paraderos.</p>
      </div>
    </div>

    <button @click="openInGoogleMaps" class="google-maps-btn">
      <span class="google-icon">🗺️</span>
      Ver rutas en Google Maps
    </button>

    <div class="features-list">
      <div class="feature">
        ✓ Rutas de buses y combis
      </div>
      <div class="feature">
        ✓ Tiempos estimados
      </div>
      <div class="feature">
        ✓ Paraderos y estaciones
      </div>
      <div class="feature">
        ✓ Múltiples opciones de ruta
      </div>
    </div>
  </div>
</template>

<style scoped>
.route-results {
  width: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-height: 640px;
  overflow-y: auto;
}

.results-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e0e0e0;
}

.results-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.address-card {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.address-item {
  margin-bottom: 12px;
}

.address-item:last-child {
  margin-bottom: 0;
}

.label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.marker {
  background: #8bc34a;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.destination .marker {
  background: #e53935;
}

.label .text {
  font-weight: 600;
  color: #5c7a3a;
  font-size: 14px;
}

.address-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.address-content p {
  flex: 1;
  margin: 0;
  font-size: 13px;
  color: #333;
  line-height: 1.4;
}

.copy-btn {
  padding: 6px 12px;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background: #e0e0e0;
}

.arrow-separator {
  text-align: center;
  font-size: 24px;
  color: #8bc34a;
  margin: 8px 0;
}

.info-box {
  display: flex;
  gap: 12px;
  background: #e8f5e9;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  border-left: 4px solid #8bc34a;
}

.info-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-content p {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #2e7d32;
  line-height: 1.5;
}

.info-content p:last-child {
  margin-bottom: 0;
}

.info-content strong {
  font-weight: 700;
}

.google-maps-btn {
  width: 100%;
  padding: 16px;
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-bottom: 16px;
}

.google-maps-btn:hover {
  background: #3367D6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.google-icon {
  font-size: 20px;
}

.features-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.feature {
  font-size: 13px;
  color: #666;
  padding: 8px;
  background: #f8f8f8;
  border-radius: 6px;
}

/* Scrollbar personalizado */
.route-results::-webkit-scrollbar {
  width: 8px;
}

.route-results::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.route-results::-webkit-scrollbar-thumb {
  background: #8bc34a;
  border-radius: 10px;
}

.route-results::-webkit-scrollbar-thumb:hover {
  background: #7cb342;
}
</style>