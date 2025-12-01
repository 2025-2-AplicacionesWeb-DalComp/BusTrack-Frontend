<script setup>
import { ref, computed } from 'vue'
import { useAlertsStore } from '@/stores/useAlertsStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const alertsStore = useAlertsStore()

const filters = ref({
  type: '',
  severity: '',
  status: ''
})

const filteredAlerts = computed(() => {
  return alertsStore.getAllAlerts.filter(alert => {
    const matchType = !filters.value.type || alert.type === filters.value.type
    const matchSeverity = !filters.value.severity || alert.severity === filters.value.severity
    const matchStatus = !filters.value.status || alert.status === filters.value.status
    return matchType && matchSeverity && matchStatus
  })
})

const handleResolve = (id) => {
  if (confirm(t('alerts.confirmResolve'))) {
    alertsStore.markAsResolved(id)
  }
}

// Función auxiliar para las clases dinámicas de gravedad
const getSeverityClass = (severity) => {
  return severity || 'medium'
}
</script>

<template>
  <div class="alerts-container">

    <div class="alerts-header">
      <h1 class="alerts-title">{{ t('alerts.title') }}</h1>
    </div>

    <div class="filters-card">
      <div class="filter-group">
        <label>{{ t('alerts.filters.type') }}</label>
        <select v-model="filters.type">
          <option value="">{{ t('alerts.filters.allTypes') }}</option>
          <option value="detour">{{ t('alerts.types.detour') }}</option>
          <option value="traffic">{{ t('alerts.types.traffic') }}</option>
          <option value="incident">{{ t('alerts.types.incident') }}</option>
          <option value="delay">{{ t('alerts.types.delay') }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{ t('alerts.filters.severity') }}</label>
        <select v-model="filters.severity">
          <option value="">{{ t('alerts.filters.allSeverities') }}</option>
          <option value="high">{{ t('alerts.severity.high') }}</option>
          <option value="medium">{{ t('alerts.severity.medium') }}</option>
          <option value="low">{{ t('alerts.severity.low') }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{ t('alerts.filters.status') }}</label>
        <select v-model="filters.status">
          <option value="">{{ t('alerts.filters.allStatus') }}</option>
          <option value="pending">{{ t('alerts.status.pending') }}</option>
          <option value="resolved">{{ t('alerts.status.resolved') }}</option>
        </select>
      </div>
    </div>

    <div class="alerts-list">

      <div v-if="filteredAlerts.length === 0" class="empty-state">
        <div class="empty-icon">🔕</div>
        <p>{{ t('alerts.empty') }}</p>
      </div>

      <div
          v-else
          v-for="alert in filteredAlerts"
          :key="alert.id"
          class="alert-card"
          :class="getSeverityClass(alert.severity)"
      >
        <div class="alert-icon">
          <span v-if="alert.severity === 'high'">🚨</span>
          <span v-else-if="alert.severity === 'medium'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>

        <div class="alert-content">
          <h3 class="alert-title">{{ alert.title }}</h3>
          <p class="alert-details">
            <strong>Bus {{ alert.busId }}</strong> • {{ alert.route }}
          </p>

          <div class="badges-row">
            <span class="badge" :class="alert.severity">
              {{ t(`alerts.severity.${alert.severity}`) }}
            </span>
            <span class="badge status" :class="alert.status">
              {{ t(`alerts.status.${alert.status}`) }}
            </span>
          </div>
        </div>

        <button
            v-if="alert.status === 'pending'"
            @click="handleResolve(alert.id)"
            class="action-btn resolve-btn"
            :title="t('alerts.actions.resolve')"
        >
          {{ t('alerts.actions.resolve') }}
        </button>
        <button
            v-else
            class="action-btn disabled-btn"
            disabled
        >
          ✓
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========================================
   Contenedor Principal y Fondo (Tu estilo)
   ========================================= */
.alerts-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 2rem;
}

.alerts-header {
  max-width: 1000px;
  margin: 0 auto 2rem;
  text-align: center;
}

.alerts-title {
  font-size: 2.5rem;
  color: #2e7d32;
  margin: 0;
  font-weight: 700;
  text-align: center;
  /* Pequeña sombra de texto para resaltar sobre el fondo */
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* =========================================
   Tarjeta de Filtros (Nuevo estilo acorde)
   ========================================= */
.filters-card {
  max-width: 1000px;
  margin: 0 auto 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 0.9rem;
  color: #2e7d32;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.filter-group select {
  padding: 0.6rem 1rem;
  border: 1px solid #c8e6c9;
  border-radius: 8px;
  background-color: #fafafa;
  font-size: 0.95rem;
  color: #333;
  outline: none;
  min-width: 180px;
  transition: all 0.3s ease;
}

.filter-group select:focus {
  border-color: #2e7d32;
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
  background-color: white;
}

/* =========================================
   Lista y Tarjetas (Adaptado de tu estilo)
   ========================================= */
.alerts-list {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.alert-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.25);
}

/* Bordes laterales según gravedad */
.alert-card.high {
  border-left: 6px solid #e53935; /* Rojo */
}

.alert-card.medium {
  border-left: 6px solid #fbc02d; /* Amarillo (Precaución) */
}

.alert-card.low {
  border-left: 6px solid #43a047; /* Verde (Info) */
}

.alert-icon {
  font-size: 2rem;
  flex-shrink: 0;
  opacity: 0.8;
}

.alert-content {
  flex: 1;
  min-width: 0;
}

.alert-title {
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: #333;
}

.alert-details {
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 0.75rem 0;
}

/* Badges dentro de la tarjeta */
.badges-row {
  display: flex;
  gap: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge.high { background: #ffebee; color: #c62828; }
.badge.medium { background: #fffde7; color: #f9a825; }
.badge.low { background: #e8f5e9; color: #2e7d32; }

.badge.status.pending { background: #fff3e0; color: #ef6c00; border: 1px solid #ffe0b2; }
.badge.status.resolved { background: #e0f2f1; color: #00695c; border: 1px solid #b2dfdb; }

/* =========================================
   Botones de Acción
   ========================================= */
.action-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.resolve-btn {
  background: #2e7d32;
  color: white;
}

.resolve-btn:hover {
  background: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}

.disabled-btn {
  background: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed;
  font-size: 1.2rem;
  padding: 0.4rem 1rem;
}

/* =========================================
   Empty State (Tu estilo)
   ========================================= */
.empty-state {
  max-width: 500px;
  margin: 4rem auto;
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.5rem;
  color: #666;
  margin: 0;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .alerts-container { padding: 1rem; }
  .alert-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .action-btn { width: 100%; margin-top: 0.5rem; }
  .filters-card { gap: 1rem; }
  .filter-group select { width: 100%; }
}
</style>