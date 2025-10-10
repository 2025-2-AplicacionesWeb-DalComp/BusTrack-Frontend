<template>
  <header class="main-header">
    <div class="title-bar">
      <h1>BusTrack</h1>
    </div>

    <nav class="nav-bar">
      <ul>
        <li><router-link to="/search-route">Buscar Ruta</router-link></li>
        <li><router-link to="/notifications">Notificaciones</router-link></li>
        <li><router-link to="/bus-stops">Paraderos Cercanos</router-link></li>
        <li><router-link to="/profile">Perfil</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// No se necesita lógica aquí
</script>

<style scoped>
/* Estilos generales */
.main-header {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: serif;
}

.title-bar {
  background-color: #789c0a;
  padding: 15px 0;
  text-align: center;
}

.title-bar h1 {
  margin: 0;
  color: white;
  font-size: 2.5em;
  font-weight: normal;
}

.nav-bar {
  background-color: #b0d159;
  padding: 15px 0;
} /* <--- AQUÍ FALTABA ESTA LLAVE DE CIERRE */

.nav-bar ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* === ESTILOS MODIFICADOS PARA LOS BOTONES === */
.nav-bar li a {
  /* Apariencia del botón */
  background-color: #789c0a;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);

  /* Estilos de texto y decoración */
  font-family: sans-serif;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  /* Transición para el efecto hover */
  transition: all 0.3s ease;
}

/* Efecto al pasar el cursor sobre un botón */
.nav-bar li a:hover {
  background-color: #5e7a08;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>