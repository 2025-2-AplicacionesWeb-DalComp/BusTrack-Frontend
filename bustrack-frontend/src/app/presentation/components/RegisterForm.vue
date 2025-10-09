<script setup lang="js">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// emits por si quieres manejarlo desde arriba
const emit = defineEmits(['submit'])

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirm: '',
})

const errors = reactive({
  email: null,
  username: null,
  password: null,
  confirm: null,
})

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function validate(){
  errors.email = !form.email ? 'Ingresa tu correo' : (!isEmail(form.email) ? 'Correo inválido' : null)
  errors.username = !form.username ? 'Ingresa tu usuario' : null
  errors.password = form.password.length < 6 ? 'Mínimo 6 caracteres' : null
  errors.confirm = form.confirm !== form.password ? 'Las contraseñas no coinciden' : null
  return !errors.email && !errors.username && !errors.password && !errors.confirm
}

const canSubmit = computed(() =>
    form.email && form.username && form.password && form.confirm
)

async function onSubmit(){
  if (!validate()) return
  // Aquí llamarías a tu usecase registerUseCase(form)
  emit('submit', { ...form })
  // Por ahora, navega a login tras "registrar"
  router.push('/login')
}

function onGoogleSignup() {
  // TODO: Implementar signup con Google
  console.log('Google signup clicked')
}
</script>

<template>
  <form class="register-form" @submit.prevent="onSubmit" novalidate>
    <h2 class="title">Crea tu cuenta</h2>

    <!-- Botón de Google -->
    <button type="button" class="google-btn" @click="onGoogleSignup">
      Continua con Google
    </button>

    <!-- Correo -->
    <label class="field">
      <span class="label">Correo</span>
      <input
          class="input"
          type="email"
          v-model.trim="form.email"
          placeholder="correo@ejemplo.com"
          autocomplete="email"
          :aria-invalid="!!errors.email"
      />
      <small v-if="errors.email" class="error">{{ errors.email }}</small>
    </label>

    <!-- Usuario -->
    <label class="field">
      <span class="label">Usuario</span>
      <input
          class="input"
          type="text"
          v-model.trim="form.username"
          placeholder="Usuario"
          autocomplete="username"
          :aria-invalid="!!errors.username"
      />
      <small v-if="errors.username" class="error">{{ errors.username }}</small>
    </label>

    <!-- Contraseña -->
    <label class="field">
      <span class="label">Contraseña</span>
      <input
          class="input"
          type="password"
          v-model="form.password"
          placeholder="Mínimo 6 caracteres"
          autocomplete="new-password"
          :aria-invalid="!!errors.password"
      />
      <small v-if="errors.password" class="error">{{ errors.password }}</small>
    </label>

    <!-- Confirmar contraseña -->
    <label class="field">
      <span class="label">Confirmar contraseña</span>
      <input
          class="input"
          type="password"
          v-model="form.confirm"
          placeholder="Repite la contraseña"
          autocomplete="new-password"
          :aria-invalid="!!errors.confirm"
      />
      <small v-if="errors.confirm" class="error">{{ errors.confirm }}</small>
    </label>

    <button class="btn" type="submit" :disabled="!canSubmit">
      Crear cuenta
    </button>

    <p class="hint">
      ¿Ya tienes una cuenta?
      <router-link to="/login" class="link">Inicia sesión</router-link>
    </p>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  padding: 24px;
}

.title {
  text-align: center;
  color: #2d6a2e;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 12px;
}

/* Botón de Google */
.google-btn {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #000;
  border-radius: 8px;
  background: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 8px;
}

.google-btn:hover {
  background: #f5f5f5;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 8px;
  background: #e5e5e5;
  color: #666;
  font-size: 15px;
  outline: none;
  box-shadow: none;
  transition: box-shadow 0.2s;
}

.input::placeholder {
  color: #999;
}

.input:focus {
  box-shadow: 0 0 0 2px rgba(45, 106, 46, 0.2);
}

.btn {
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  background: #5a5a5a;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hint {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 4px;
}

.link {
  color: #2d6a2e;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: #d32f2f;
  font-size: 13px;
  margin-top: 4px;
}
</style>