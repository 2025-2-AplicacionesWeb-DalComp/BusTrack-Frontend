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

/* --- Logo box --- */
.icon{
  
  --nudge: 40px;            
  transform: translateX(calc(-1 * var(--nudge)));
}

.screen {
  width: 100vw; 
  min-height: 100vh;  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #d6ec9c; 
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
