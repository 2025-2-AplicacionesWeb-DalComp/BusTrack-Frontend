<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const companyName = ref('')
const ruc = ref('')
const corporateEmail = ref('')
const address = ref('')
const password = ref('')
const confirmPassword = ref('')
const fleetSize = ref('')

const passwordMismatch = computed(
    () =>
        password.value &&
        confirmPassword.value &&
        password.value !== confirmPassword.value
)

const formValid = computed(
    () =>
        companyName.value &&
        ruc.value &&
        corporateEmail.value &&
        address.value &&
        password.value &&
        confirmPassword.value &&
        !passwordMismatch.value
)

function onSubmit (e) {
  e.preventDefault()
  if (!formValid.value) return

  const payload = {
    companyName: companyName.value,
    ruc: ruc.value,
    corporateEmail: corporateEmail.value,
    address: address.value,
    password: password.value,
    fleetSize: fleetSize.value
  }

  console.log('Registro empresa:', payload)
}
</script>

<template>
  <form class="form" @submit="onSubmit">
    <h1 class="title">
      {{ t('companyRegister.register.title') }}
    </h1>

    <label class="field">
      <span>{{ t('companyRegister.register.companyName') }}</span>
      <input
          v-model="companyName"
          type="text"
          :placeholder="t('companyRegister.register.companyNamePlaceholder')"
      />
    </label>

    <label class="field">
      <span>{{ t('companyRegister.register.ruc') }}</span>
      <input
          v-model="ruc"
          type="text"
          :placeholder="t('companyRegister.register.rucPlaceholder')"
      />
    </label>

    <label class="field">
      <span>{{ t('companyRegister.register.corporateEmail') }}</span>
      <input
          v-model="corporateEmail"
          type="email"
          :placeholder="t('companyRegister.register.corporateEmailPlaceholder')"
      />
    </label>

    <label class="field">
      <span>{{ t('companyRegister.register.address') }}</span>
      <input
          v-model="address"
          type="text"
          :placeholder="t('companyRegister.register.addressPlaceholder')"
      />
    </label>

    <label class="field">
      <span>{{ t('companyRegister.register.password') }}</span>
      <input
          v-model="password"
          type="password"
          :placeholder="t('companyRegister.register.passwordPlaceholder')"
      />
    </label>

    <label class="field">
      <span>{{ t('companyRegister.register.confirmPassword') }}</span>
      <input
          v-model="confirmPassword"
          type="password"
          :placeholder="t('companyRegister.register.confirmPasswordPlaceholder')"
      />
      <small v-if="passwordMismatch" class="error">
        {{ t('companyRegister.register.passwordMismatch') }}
      </small>
    </label>

    <label class="field">
      <span>{{ t('companyRegister.register.fleetSize') }}</span>
      <input
          v-model="fleetSize"
          type="number"
          min="1"
          :placeholder="t('companyRegister.register.fleetSizePlaceholder')"
      />
    </label>

    <button class="submit" type="submit" :disabled="!formValid">
      {{ t('companyRegister.register.submit') }}
    </button>

    <p class="footnote">
      {{ t('companyRegister.register.alreadyHaveAccount') }}
      <router-link to="/company/login">
        {{ t('companyRegister.register.loginLink') }}
      </router-link>
    </p>
  </form>
</template>


<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.title {
  text-align: center;
  margin-bottom: 8px;
}
.field {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 4px;
}
.field input {
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.error {
  color: #c00;
  font-size: 0.75rem;
}
.submit {
  margin-top: 8px;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: #000;
  color: #fff;
  cursor: pointer;
}
.submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.footnote {
  margin-top: 8px;
  font-size: 0.85rem;
  text-align: center;
}
</style>
