<template>
  <header class="main-header">
    <div class="title-bar">
      <h1>BusTrack</h1>
    </div>

    <nav class="nav-bar">
      <ul>
        <router-link to="/search">Buscar Ruta</router-link>
        <li><router-link to="/notificaciones">Notificaciones</router-link></li>
        <li><router-link to="/paraderos">Paraderos Cercanos</router-link></li>
        <li><router-link to="/perfil">Perfil</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>

/* Aplicamos los estilos de botón directamente al enlace (<a>)
   que genera <router-link> para mantener la apariencia. */
.nav-bar li a {
  display: inline-block; /* Necesario para aplicar padding correctamente */
  background-color: #789c0a;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  font-family: sans-serif;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-bar li a:hover {
  background-color: #5e7a08;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}


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