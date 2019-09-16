<template>
 <div>
    <h1>Cadastro de Vídeo Galeria</h1>
    <div id='msg' v-html="mensagem"></div>

    <div id='listagem' class='format' v-show="exibirListagemForm">
      <button id='btn-exibir-formulario' type="button" class="btn btn-primary"
      v-on:click="prepararFormCadastro()">
        <i class="fas fa-video"></i> Cadastrar
      </button>
      <br>
      <div id='galeria-listagem' class='format'>
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Vídeo</th>
                  <th>Editar</th>
                  <th>Deletar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listagem" :key="index">
                  <td>{{item.id_galeria_video}}</td>
                  <td>{{item.titulo}}</td>
                  <td><video v-bind:src="item.caminho" width="320" heigth="240" controls></video></td>
                  <td><button type="button" class="btn btn-danger"
                    v-on:click="prepararFormEditar(item.id_galeria_video)">
                    <i class="fas fa-edit"></i> Editar
                  </button></td>
                  <td><button type="button" class="btn btn-danger"
                    v-on:click="deletar(item.id_galeria_video)">
                    <i class="fas fa-trash-alt"></i> Deletar
                  </button></td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>

    <div id='formulario' class='format' v-show="!exibirListagemForm">
        <div class='row'>
          <div class="col-sm">
            <form id="galeriaForm" method="POST" action="/" v-on:submit.prevent="salvar">
                <div class="form-group">
                  <label for="id">Código</label>
                  <input type="number" class="form-control" id="id_galeria_video"
                  name="id_galeria_video" disabled="disabled" 
                  v-model="registro.id_galeria_video">
                </div>

                <div class="form-group">
                  <label for="titulo">Título</label>
                  <input type="text" class="form-control" id="titulo"
                  name="titulo" placeholder="Informe um título"
                  v-model="registro.titulo">
                </div>

                <div class="form-group">
                  <label for="video">Vídeo</label>
                  <input type="file" class="form-control-file" id="arquivo"
                  ref="arquivo" v-on:change="carregarVideo($event)"
                  name="arquivo" >
                </div>    

                <div class="form-group">
                  <video v-bind:src="urlVideo" width="320" heigth="240" controls></video>
                </div>  

                <div class="form-inline">
                    <button id='btn-cadastrar' type="submit" class="btn btn-primary mr-sm-2">
                      <i class="fas fa-save"></i> Salvar
                    </button>
                    <button id='btn-cancelar-operacao' type="button" 
                    class="btn btn-primary" v-on:click="cancelarOperacao()">
                      <i class="fas fa-ban"></i> Cancelar
                    </button>
                </div>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manterGaleria',
   data() {
    return {
      exibirListagemForm: true,
      listagem: null,
      mensagem: "",
      urlVideo: "",
      arquivoVideo: "",
      registro: {id_galeria_video: null, titulo: ""},
      resgistroFormData: null
    }
  },
  methods: {
    listarDados(){
      this.$galeriaService.getTodos().then(response => {
        if(response.erro){
          this.exibirMsgAlert("Ocorreu um erro.", "erro");
          console.log("deu erro");
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
          console.log("deu erro");
      });
    },
    exibirMsgAlert(msg, tipo){
      let dados = "";
      if(tipo == "sucesso"){
        dados  = `<div class='alert alert-success' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }else if(tipo == "erro"){
        dados  = `<div class='alert alert-danger' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }
      this.mensagem = dados;
    },
    limparMsgAlert(){
      this.mensagem = "";
    },
    prepararFormCadastro(){
      this.limparMsgAlert();
      this.exibirListagemForm = false;
    },
    carregarVideo(event){
      //if(event.target.files.length > 0)
      if(this.$refs.arquivo.files.length > 0){
        const leitor = new FileReader();
        const arquivo = this.$refs.arquivo.files[0];
        leitor.readAsDataURL(arquivo);
        leitor.onload = () => {
          const dataUrl = leitor.result;
          this.urlVideo = dataUrl;
          this.arquivoVideo = arquivo;
        }
      }
    },
    salvar(){
      this.resgistroFormData = new FormData();
      this.resgistroFormData.append('id_galeria_video', this.registro.id_galeria_video);
      this.resgistroFormData.append('titulo', this.registro.titulo);
      this.resgistroFormData.append('arquivo', this.arquivoVideo);
      if(this.registro.id_galeria_video > 0){
        this.editar(this.resgistroFormData);
      }else{
        this.cadastrar(this.resgistroFormData);
      }
    },
    cadastrar(dadosFormData){
      this.$galeriaService.adicionar(dadosFormData).then(response => {
          
          if(!this.verificarRetornoHttp(response)){
            this.limparForm();
            this.listarDados();
            this.exibirListagemForm = true;
          }                    
      }).catch(response => {
        this.exibirMsgAlert("Erro ao executar a operação de cadastro.", "erro");
      })
    },
    verificarRetornoHttp(resp){
      if(resp.erro) {
        this.exibirMsgAlert(resp.msg, "erro");
        return true;
      } else{
        if(resp.msg != null){
          this.exibirMsgAlert(resp.msg, "sucesso");
          return false;
        }        
      }
    },
    limparForm(){
      let formHtml = document.getElementById("galeriaForm");
      formHtml.reset();
      this.urlVideo = '';
      this.arquivoVideo = null;
      this.resgistroFormData = new FormData();
      this.registro = {id_galeria_video: null, titulo: ""};
    },
    prepararFormEditar(id){
      this.limparMsgAlert();
      this.$galeriaService.getId(id).then(response => {
        if(!this.verificarRetornoHttp(response)){
          this.registro.id_galeria_video = response.dados[0].id_galeria_video;
          this.registro.titulo = response.dados[0].titulo;
          if(response.dados[0].caminho != null){
            this.urlVideo = this.$server + response.dados[0].caminho.substring(1);
          }
          this.exibirListagemForm = false;
        }
      }).catch(response => {
        this.exibirMsgAlert("Erro ao executar a operação de editar.", "erro");
      });
    },
    cancelarOperacao(){
      this.limparForm();
      this.limparMsgAlert();
      this.exibirListagemForm = true;
    },
    editar(dadosFormData){
      this.$galeriaService.editar(dadosFormData).then(response => {
        if(!this.verificarRetornoHttp(response)){
          this.limparForm();
          this.listarDados();
          this.exibirListagemForm = true;
        }
      }).catch(response => {
        this.exibirMsgAlert("Erro ao realizar a operação editar.", "erro");
      })
    },
    deletar(id){
      this.$galeriaService.deletar(id).then(response => {
        if(!this.verificarRetornoHttp(response)){
          this.listarDados();
        }
      }).catch(response => {
        this.exibirMsgAlert("Erro ao realizar a operação deletar.", "erro");
      })
    }
  },
  mounted(){
    this.listarDados();
  }
}
</script>
<style scoped>
.format {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>