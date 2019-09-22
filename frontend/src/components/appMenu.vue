<template>
  <!-- Menu -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-azul">        
        <router-link class="navbar-brand" to="Home">Home</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">              
              <router-link class="nav-link" to="Galeria">Galeria</router-link>
            </li>
          </ul>
        </div>
      </nav>

  <!-- Fim Menu-->
</template>
<script>
export default {
    name: "AppMenu",
  data() {
    return {}
  }
}
</script>

<style  scoped>
.bg-azul {
    background-color: #2185d0 !important;
}
</style>
