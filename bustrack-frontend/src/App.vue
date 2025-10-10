<script setup>
// Ruta CORRECTA según tu estructura
import MainToolbar from './shared/presentation/components/MainToolbar.vue';

defineOptions({
  name: 'App'
});
</script>

<template>
  <div id="app">
    <MainToolbar />
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* Estilos globales para app */
body {
  margin: 0;
  font-family: sans-serif;
}
</style>