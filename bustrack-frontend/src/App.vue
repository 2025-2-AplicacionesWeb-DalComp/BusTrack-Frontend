<script setup>
import MainToolbar from './shared/presentation/components/MainToolbar.vue';

defineOptions({
  name: 'App'
});
</script>

<template>
  <div id="app">
    <MainToolbar />

  </div>
</template>

<style scoped>
/* Estilos globales para app */
body {
  margin: 0;
  font-family: sans-serif; /* Fuente base para el resto de la app */
}
</style>
