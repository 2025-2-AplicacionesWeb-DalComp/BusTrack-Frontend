<script setup lang="js">
import { ref } from 'vue'
import Card from '@/shared/presentation/components/Card.vue'
import LoginForm from '@/app/presentation/components/LoginForm.vue'
import { useRouter } from 'vue-router'

const loading = ref(false)
const router = useRouter()

async function onLogin(payload) {
  router.push('/home')
}
</script>

<template>
  <section class="screen">

    <div class="brand">
      <div class="logo-box">
        <img src="@/assets/logo-bustrack.png" alt="BusTrack" />
      </div>
    </div>

    <Card class="panel">
      <LoginForm :loading="loading" @submit="onLogin" />
    </Card>
  </section>
</template>


<style scoped>
.screen{
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;   /* centro el conjunto logo + card */
  gap: 40px;                 /* separación base entre logo y card */
  padding: 24px;
  background: #d6ec9c;
}

/* --- Logo box (tamaño y forma) --- */
.brand{
  /* mueve el logo hacia la izquierda (ajusta este valor a tu gusto) */
  --nudge: 40px;             /* prueba con 10px, 20px, 40px… */
  transform: translateX(calc(-1 * var(--nudge)));
}

.logo-box{
  width: clamp(240px, 32vw, 360px);
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,.15);
}
.logo-box img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Card */
.panel{
  width: min(92vw, 480px);
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  z-index: 1;
}

/* En móvil, quita el empuje para que todo quede centrado */
@media (max-width: 960px){
  .screen{ flex-direction: column; gap: 24px; }
  .brand{ transform: none; }   /* sin nudge en pantallas pequeñas */
  .logo-box{ width: min(70vw, 340px); }
}
</style>
