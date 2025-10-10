<template>
  <div class="simple-map-container">
    <!-- Imagen PNG del mapa -->
    <div class="map-image-container">
      <img
          src="/mapa-paraderos.png"
          alt="Mapa de paraderos cercanos"
          class="map-image"
          @error="showFallback = true"
      />
      <div class="image-fallback" v-if="showFallback">
        <div class="fallback-content">
          <div class="fallback-icon">🗺️</div>
          <p>Mapa de paraderos</p>
          <small>Coloca tu imagen mapa-paraderos.png en la carpeta public</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFallback = ref(false)
</script>

<style scoped>
.simple-map-container {
  background: white;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  overflow: hidden;
  width: 100%;
  height: 100%; /* Ocupa todo el espacio del contenedor padre */
  display: flex;
  flex-direction: column;
}

.map-image-container {
  width: 100%;
  height: 100%; /* Ocupa toda la altura del contenedor */
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 500px; /* Altura mínima más grande */
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
}

.fallback-content {
  text-align: center;
  color: #666;
  padding: 20px;
}

.fallback-icon {
  font-size: 3em;
  margin-bottom: 10px;
}

.fallback-content p {
  margin: 0 0 5px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.fallback-content small {
  color: #888;
  font-size: 0.9em;
}

/* Eliminé el stops-list ya que no lo estás usando en el template */
</style>