<script setup lang="js">
// Versión simple: sin props. Solo actúa como contenedor con sombra y padding.
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card{
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: var(--shadow, 0 10px 20px rgba(0,0,0,.15));
}
</style>
