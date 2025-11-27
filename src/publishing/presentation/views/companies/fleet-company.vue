<script setup lang="js">
import CompanyTopNav from '@/shared/presentation/components/CompanyTopNav.vue'
</script>

<template>
  <div class="page">
    <CompanyTopNav />

    <main class="content">
      <!-- Aquí luego pondrán KPIs, tarjetas, gráficos, etc. -->
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
}

.content {
  max-width: 1100px;
  margin: 32px auto;
  padding: 0 16px 48px;
}
</style>
