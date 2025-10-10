<template>
  <div class="app-layout">
    <MainToolbar />
    <main class="main-content">
      <router-view />
    </main>
    <FooterContent />
  </div>
</template>

<script setup>
import MainToolbar from '../components/MainToolbar.vue'
import FooterContent from '../components/footer-content.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>