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
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
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
