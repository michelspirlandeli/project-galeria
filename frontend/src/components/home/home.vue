<template>
  <div>
    <h1>Galeria de Vídeos</h1>
    <div v-for="(item, index) in listagem" :key="index">
      <div class="card text-white bg-info mb-3">
      <div class="card-header">
       <i class="fas fa-video"></i> {{item.titulo}}
      </div>
      <div class="card-body">
        <div class="embed-responsive embed-responsive-21by9">
           <video v-bind:src="item.caminho" controls width="620" height="440"></video>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      listagem: null
    }
  },
  methods:{
    listarDados(){
      this.$galeriaServices.getTodos().then(response => {
        if(response.erro){
          this.exibirMsgAlert("Ocorreu um erro.", "erro");
        }else{
          this.listagem = response.dados.map(function(objeto){
            return { id_galeria_video: objeto.id_galeria_video,
            titulo: objeto.titulo,
            caminho:  this + (objeto.caminho ? objeto.caminho.substring(1) : objeto.caminho) 
            }
          }, this.$server);
        }
      }).catch(response => {
        this.exibirMsgAlert("Ocorreu um erro.", "erro");
      });
    }
},
  mounted(){
    this.listarDados();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>