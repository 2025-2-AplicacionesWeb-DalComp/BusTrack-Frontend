<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useRouteStore from '../../application/route.store.js';
import {Route} from '../../domain/model/route.entity.js';
import {computed, onMounted, ref} from "vue";

// Inicializamos el store
const store = useRouteStore();

// Vinculamos esta variable al input del formulario
const searchText = ref('');

// Función que se ejecuta al hacer clic en el botón "Buscar"
const handleSearch = () => {
  // Llama a la acción del store con el texto actual del input
  store.fetchRoutes(searchText.value);
};

// Carga todas las rutas la primera vez que el componente se monta
onMounted(() => {
  store.fetchRoutes();
});
</script>

<template>
  <div class="search-container">
    <div class="search-form">
      <div class="input-group">
        <label for="search-input">Desde</label>
        <input
            id="search-input"
            type="text"
            v-model="searchText"
            placeholder="Escribe aquí"
            @keyup.enter="handleSearch"
        />
      </div>
      <button @click="handleSearch" :disabled="store.isLoading">
        {{ store.isLoading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>

    <div class="results-container">
      <ul v-if="store.routes.length > 0">
        <li v-for="route in store.routes" :key="route.id">
          <h3>{{ route.name }}</h3>
          <p><strong>Tiempo estimado de ruta:</strong> {{ route.estimatedTime }}</p>
          <p><strong>Próximo bus en:</strong> {{ route.frequency }}</p>
        </li>
      </ul>

      <p v-else-if="!store.isLoading">
        No se encontraron rutas.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Estilo general con la fuente serif */
.search-container {
  font-family: 'Georgia', serif;
  color: #3b4a1a; /* Verde oscuro para el texto */
  padding: 2rem;
}

/* Contenedor del formulario de búsqueda */
.search-form {
  display: flex;
  align-items: flex-end; /* Alinea el botón y el input en la base */
  gap: 20px;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

/* Estilo del input como en la imagen */
.input-group input {
  background-color: black;
  color: white;
  border: none;
  border-radius: 25px; /* Bordes bien redondeados */
  padding: 12px 20px;
  font-size: 1.1rem;
  font-family: 'Georgia', serif;
  min-width: 300px;
}

/* Estilo del botón */
button {
  background-color: transparent;
  color: #3b4a1a;
  border: none;
  font-size: 1.5rem;
  font-family: 'Georgia', serif;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.3s;
}

button:hover {
  opacity: 0.7;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Estilo de la lista de resultados */
.results-container {
  margin-top: 20px;
}

.results-container ul {
  list-style: none;
  padding: 0;
}

.results-container li {
  background-color: #f0f3e8;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.results-container h3 {
  margin: 0 0 10px 0;
  color: #3b4a1a;
}
</style>