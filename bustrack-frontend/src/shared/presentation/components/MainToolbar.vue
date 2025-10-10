<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <header class="main-header">
    <div class="title-bar">
      <h1>BusTrack</h1>
    </div>

    <nav class="nav-bar">
      <ul>
        <li><router-link to="/buscar-ruta">{{ t('option.categories') }}</router-link></li>
        <li><router-link to="/notificaciones">{{ t('option.notifications') }}</router-link></li>
        <li><router-link to="/paraderos">{{ t('option.busstops') }}</router-link></li>
        <li><router-link to="/perfil">{{ t('option.profile') }}</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Tus estilos actuales se mantienen igual */
.main-header {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: serif;
}

.title-bar {
  background-color: #789c0a;
  padding: 15px 0;
  text-align: center;
}

.title-bar h1 {
  margin: 0;
  color: white;
  font-size: 2.5em;
  font-weight: normal;
}

.nav-bar {
  background-color: #b0d159;
  padding: 15px 0;
}

.nav-bar ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-bar li a {
  background-color: #789c0a;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  font-family: sans-serif;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
}

.nav-bar li a:hover {
  background-color: #5e7a08;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>