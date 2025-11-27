<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const routes = ref([
  { id: 1, name: 'UPC, Campus San Miguel → UPC, Campus San Isidro' },
  { id: 2, name: 'Casa → UPC, Campus San Miguel' }
])

const goBack = () => {
  router.back()
}

const viewRouteDetails = (routeId) => {
  console.log('Ver detalles de ruta:', routeId)
}

const removeRoute = (routeId) => {
  routes.value = routes.value.filter(route => route.id !== routeId)
}
</script>


<template>
  <div class="favorite-routes-container">
    <!-- Botón Volver -->
    <div class="navigation-section">
      <button class="back-btn" @click="goBack">
        {{ $t('favoriteRoutes.back') }}
      </button>
    </div>

    <!-- Contenido Principal -->
    <div class="content-section">
      <h1 class="page-title">{{ $t('favoriteRoutes.title') }}</h1>

      <div class="routes-list">
        <div class="route-card">
          <div class="route-info">
            <span class="route-text">UPC, Campus San Miguel → UPC, Campus San Isidro</span>
          </div>
          <div class="route-actions">
            <button class="action-btn" @click="viewRouteDetails(1)">
              {{ $t('favoriteRoutes.viewDetails') }}
            </button>
            <button class="delete-btn" @click="removeRoute(1)">
              {{ $t('favoriteRoutes.remove') }}
            </button>
          </div>
        </div>

        <div class="route-card">
          <div class="route-info">
            <span class="route-text">Casa → UPC, Campus San Miguel</span>
          </div>
          <div class="route-actions">
            <button class="action-btn" @click="viewRouteDetails(2)">
              {{ $t('favoriteRoutes.viewDetails') }}
            </button>
            <button class="delete-btn" @click="removeRoute(2)">
              {{ $t('favoriteRoutes.remove') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay rutas -->
      <div v-if="routes.length === 0" class="empty-state">
        <p>{{ $t('favoriteRoutes.noRoutes') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorite-routes-container {
  padding: 20px;
  min-height: 100vh;
  background-color: white;
}

.navigation-section {
  margin-bottom: 30px;
}

.back-btn {
  background-color: black;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #333;
}

.content-section {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #5e7a08;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.route-card {
  background-color: #e8f5d3;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.route-info {
  flex: 1;
}

.route-text {
  color: #5e7a08;
  font-weight: bold;
  font-size: 1.1em;
}

.route-actions {
  display: flex;
  gap: 10px;
}

.action-btn, .delete-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn {
  background-color: #789c0a;
  color: white;
}

.action-btn:hover {
  background-color: #5e7a08;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 40px;
}

@media (max-width: 768px) {
  .route-card {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .route-actions {
    justify-content: center;
  }
}
</style>