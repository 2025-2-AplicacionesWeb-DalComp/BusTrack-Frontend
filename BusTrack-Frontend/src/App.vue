<script setup>
import MainToolbar from './shared/presentation/components/MainToolbar.vue';

defineOptions({
  name: 'App'
});
</script>

<template>
  <div id="app">
    <MainToolbar />
    <router-view />
  </div>
</template>

<style>
/* Estilos globales para app */
body {
  margin: 0;
  font-family: sans-serif;
  background-color: white;
}

#app {
  min-height: 100vh;
  background-color: white;
}
</style>
