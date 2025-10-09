<template>
  <header class="main-header">
    <div class="title-bar">
      <h1>BusTrack</h1>
    </div>

    <nav class="nav-bar">
      <ul>
        <li><router-link to="/buscar-ruta">Buscar Ruta</router-link></li>
        <li><router-link to="/notificaciones">Notificaciones</router-link></li>
        <li><router-link to="/paraderos">Paraderos Cercanos</router-link></li>
        <li><router-link to="/perfil">Perfil</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// No se necesita lógica aquí
</script>

<style scoped>
/* Estilos generales (sin cambios) */
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
  padding: 15px 0; /* Aumentamos el padding para dar más espacio a los botones */
}

.nav-bar ul {
  display: flex;
  justify-content: space-evenly; /* space-evenly da un poco más de aire en los extremos */
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* === ESTILOS MODIFICADOS PARA LOS BOTONES === */
.nav-bar li a {
  /* Apariencia del botón */
  background-color: #789c0a;  /* Color de fondo del botón, igual al título */
  color: white;               /* Color del texto */
  padding: 10px 20px;         /* Espaciado interno (alto y ancho) */
  border-radius: 8px;         /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Sombra para dar profundidad */

  /* Estilos de texto y decoración */
  font-family: sans-serif;    /* Cambiamos a una fuente más legible para botones */
  font-weight: bold;
  text-decoration: none;      /* Quita el subrayado del enlace */
  text-align: center;

  /* Transición para el efecto hover */
  transition: all 0.3s ease;
}

/* Efecto al pasar el cursor sobre un botón */
.nav-bar li a:hover {
  background-color: #5e7a08;  /* Un verde un poco más oscuro */
  transform: translateY(-2px); /* Eleva ligeramente el botón */
  box-shadow: 0 4px 6px rgba(0,0,0,0.3); /* Aumenta la sombra para el efecto */
}
</style>