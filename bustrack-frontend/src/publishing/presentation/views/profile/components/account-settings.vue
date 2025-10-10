<template>
  <div class="account-settings-container">
    <!-- Botón Volver -->
    <div class="navigation-section">
      <button class="back-btn" @click="goBack">
        {{ $t('accountSettings.back') }}
      </button>
    </div>

    <!-- Contenido Principal -->
    <div class="content-section">
      <h1 class="page-title">{{ $t('accountSettings.title') }}</h1>

      <div class="settings-card">
        <!-- Avatar -->
        <div class="avatar-section">
          <div class="avatar-container">
            <div class="avatar-icon">
              <span class="avatar-symbol">👤</span>
            </div>
          </div>
          <button class="change-photo-btn" @click="changePhoto">
            {{ $t('accountSettings.changePhoto') }}
          </button>
        </div>

        <!-- Campos de edición -->
        <div class="form-section">
          <div class="form-field">
            <label class="field-label">{{ $t('accountSettings.name') }}</label>
            <input
                v-model="userData.name"
                type="text"
                class="form-input"
                :placeholder="$t('accountSettings.namePlaceholder')"
            >
          </div>

          <div class="form-field">
            <label class="field-label">{{ $t('accountSettings.email') }}</label>
            <input
                v-model="userData.email"
                type="email"
                class="form-input"
                :placeholder="$t('accountSettings.emailPlaceholder')"
            >
          </div>

          <div class="form-field">
            <label class="field-label">{{ $t('accountSettings.password') }}</label>
            <input
                v-model="userData.password"
                type="password"
                class="form-input"
                :placeholder="$t('accountSettings.passwordPlaceholder')"
            >
          </div>
        </div>

        <!-- Botón Guardar -->
        <div class="actions-section">
          <button class="save-btn" @click="saveChanges">
            {{ $t('accountSettings.saveChanges') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userData = ref({
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  password: '********'
})

const goBack = () => {
  router.back()
}

const changePhoto = () => {
  console.log('Cambiar foto de perfil')
}

const saveChanges = () => {
  console.log('Guardando cambios:', userData.value)
  alert('Cambios guardados exitosamente')
}
</script>

<style scoped>
.account-settings-container {
  padding: 20px;
  min-height: 100vh;
  background-color: white;
}

.navigation-section {
  margin-bottom: 30px;
}

.back-btn {
  background-color: black;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #333;
}

.content-section {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  color: #5e7a08;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
}

.settings-card {
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.avatar-container {
  margin-bottom: 15px;
}

.avatar-icon {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #789c0a;
}

.avatar-symbol {
  font-size: 3em;
  color: black;
}

.change-photo-btn {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.change-photo-btn:hover {
  background-color: #333;
}

.form-section {
  margin-bottom: 30px;
}

.form-field {
  margin-bottom: 20px;
}

.field-label {
  display: block;
  color: #5e7a08;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1em;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #789c0a;
}

.actions-section {
  display: flex;
  justify-content: center;
}

.save-btn {
  background-color: black;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.save-btn:hover {
  background-color: #333;
}
</style>