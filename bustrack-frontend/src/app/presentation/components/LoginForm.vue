<script setup lang="js">
import { useI18n } from 'vue-i18n'
import { computed, reactive } from 'vue'
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";

const { t } = useI18n()

const props = defineProps({
  loading: { type: Boolean, default: false },
  defaultUsername: { type: String, default: '' },
})


const emit = defineEmits(['submit'])


const form = reactive({
  username: props.defaultUsername || '',
  password: '',
})



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

const canSubmit = computed(() => !props.loading)
</script>

<template>
  <div>
    <div class="language-switcher">
      <LanguageSwitcher />
    </div>
  <form class="login-form" @submit.prevent="onSubmit" novalidate>


    <div class="form-head">
      <h2 class="title">{{ t('auth.login.title') }}</h2>
    </div>


    <!-- Usuario -->
    <label class="field">
      <input
          class="input"
          type="text"
          autocomplete="username"
          v-model.trim="form.username"
          :aria-invalid="!!errors.username"
          :aria-label="t('auth.login.username')"
          :placeholder="t('auth.login.username')"
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
          :aria-label="t('auth.login.password')"
          :placeholder="t('auth.login.password')"
      />
      <small v-if="errors.password" class="error">{{ errors.password }}</small>
    </label>

    <div class="aux">
      <span class="link disabled" aria-disabled="true">
    {{ t('auth.login.forgot') }}
  </span>
    </div>

    <button class="btn" type="submit" :disabled="!canSubmit">
      {{ props.loading ? t('auth.login.continuing') : t('auth.login.continue') }}
    </button>

    <p class="hint">
      {{ t('auth.login.noAccount') }}
      <router-link to="/register" class="link">{{ t('auth.login.register') }}</router-link>
    </p>

  </form>
  </div>
</template>

<style scoped>
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

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
