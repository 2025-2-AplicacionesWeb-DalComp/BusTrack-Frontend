<script setup>
import MainToolbar from '@/shared/presentation/components/MainToolbar.vue'
</script>

<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background: #fff;
  overflow-x: hidden;
}

body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>