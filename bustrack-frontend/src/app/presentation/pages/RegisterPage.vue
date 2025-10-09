<script setup lang="js">
import Card from '@/shared/presentation/components/Card.vue'
import RegisterForm from '@/app/presentation/components/RegisterForm.vue'
</script>

<template>
  <section class="screen">

    <div class="icon">
      <div class="person-icon">
        <img src="@/assets/person-icon.png" alt="BusTrack" />
      </div>
    </div>

    <Card class="panel">
      <RegisterForm />
    </Card>
  </section>
</template>

<style scoped>

/* --- Logo box (tamaño y forma) --- */
.icon{
  /* mueve el logo hacia la izquierda (ajusta este valor a tu gusto) */
  --nudge: 40px;             /* prueba con 10px, 20px, 40px… */
  transform: translateX(calc(-1 * var(--nudge)));
}

.screen {
  width: 100vw;  /* TODO el ancho del viewport */
  min-height: 100vh;  /* TODO el alto del viewport */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #d6ec9c;  /* Verde claro en TODA la pantalla */
  margin: 0;
  position: relative;
  left: 0;
  right: 0;
}

.panel {
  width: min(90vw, 450px);
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
}
</style>