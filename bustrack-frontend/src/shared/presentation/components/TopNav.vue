<script setup lang="js">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const tabs = [
  { to: '/home', label: 'Buscar Ruta' },
  { to: '/home#notificaciones', label: 'Notificaciones' },
  { to: '/home#paraderos', label: 'Paraderos Cercanos' },
  { to: '/home#perfil', label: 'Perfil' },
]

function go(to) {
  router.push(to)
}
</script>

<template>
  <header class="nav">
    <div class="brand">BusTrack</div>
    <nav class="tabs">
      <button
          v-for="t in tabs"
          :key="t.to"
          class="tab"
          :class="{ active: route.fullPath === t.to }"
          @click="go(t.to)">
        {{ t.label }}
      </button>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #9cc642;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.brand {
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  padding: 16px 0;
  color: #fff;
  letter-spacing: 1px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 14px 24px;
  background: #aedd49;
}

.tab {
  background: transparent;
  border: 0;
  color: #2d6a2e;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.2s;
  position: relative;
}

.tab:hover {
  color: #1a4d1b;
}

.tab.active {
  color: #1a4d1b;
  font-weight: 700;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #2d6a2e;
  border-radius: 2px;
}
</style>