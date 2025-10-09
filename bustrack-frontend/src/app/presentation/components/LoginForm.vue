<script setup lang="js">
import { computed, reactive } from 'vue'

// Props (solo JS)
const props = defineProps({
  loading: { type: Boolean, default: false },
  defaultUsername: { type: String, default: '' },
})

// Emits (solo nombres de eventos en JS)
const emit = defineEmits(['submit'])

// Estado local del formulario
const form = reactive({
  username: props.defaultUsername || '',
  password: '',
})

// Validaciones muy básicas
const errors = reactive({
  username: null,
  password: null,
})

function validate() {
  errors.username = !form.username ? 'Ingresa tu usuario' : null
  errors.password = !form.password ? 'Ingresa tu contraseña' : null
  return !errors.username && !errors.password
}

function onSubmit() {
  if (!validate()) return
  emit('submit', { username: form.username, password: form.password })
}

// Accesibilidad: desactivar botón si inválido o loading
const canSubmit = computed(() => !props.loading)
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit" novalidate>
    <h2 class="title">Log In</h2>

    <!-- Usuario -->
    <label class="field">
      <input
          class="input"
          type="text"
          autocomplete="username"
          v-model.trim="form.username"
          :aria-invalid="!!errors.username"
          aria-label="Usuario"
          placeholder="Usuario"
      />
      <small v-if="errors.username" class="error">{{ errors.username }}</small>
    </label>

    <!-- Contraseña -->
    <label class="field">
      <input
          class="input"
          type="password"
          autocomplete="current-password"
          v-model="form.password"
          :aria-invalid="!!errors.password"
          aria-label="Contraseña"
          placeholder="Contraseña"
      />
      <small v-if="errors.password" class="error">{{ errors.password }}</small>
    </label>

    <div class="aux">
      <router-link to="/forgot" class="link">¿Olvidaste tu contraseña?</router-link>
    </div>

    <button class="btn" type="submit" :disabled="!canSubmit">
      {{ props.loading ? 'Continuando…' : 'Continuar' }}
    </button>

    <p class="hint">
      ¿No tienes una cuenta?
      <router-link to="/register" class="link">Regístrate</router-link>
    </p>

  </form>
</template>

<style scoped>
.login-form {
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
  margin: 0 0 8px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Input sin label visible */
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

.aux {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-top: -4px;
}

.link {
  color: #2d6a2e;
  text-decoration: none;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  background: #000;
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

.error {
  color: #d32f2f;
  font-size: 13px;
  margin-top: 4px;
}
</style>