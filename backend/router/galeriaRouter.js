const express = require('express');
const router = express.Router();

const GaleriaModel = require('../model/GaleriaModel');
const RespostaClass = require('../model/RespostaClass');

let pastaPublica = './public/arquivos/';

let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pastaPublica)
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
      let nomeArquivo = 
      `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
      req.body.caminho = pastaPublica+nomeArquivo;
      cb(null, nomeArquivo)
    }
  })

  var upload = multer({storage: storage});

function deletarArquivo(caminho){
    if(caminho != null){
        fs.unlinkSync(caminho);
        console.log('arquivo deletado');
    }
}

router.post("/", upload.single('arquivo'), function(req, resp, next){
    let resposta = new RespostaClass();

    if(req.file != null){

        GaleriaModel.adicionar(req.body, function(error, retorno){

            if(error){
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro."
                console.log("erro: ", error);
                deletarArquivo(req.body.caminho);
            }else{
                if(retorno.affectedRows > 0){
                    resposta.msg = "Cadastro realizado com sucesso."
                }else{
                    resposta.erro = true;
                    resposta.msg = "Não foi possível realizar o cadastro."
                    console.log("erro: ", error);
                    deletarArquivo(req.body.caminho);
                }
            }
            console.log('resp:', resposta);
            resp.json(resposta);
        });

    }else{
        resposta.erro = true;
        resposta.msg = "Não foi enviado um vídeo."
        console.log("erro: ",  resposta.msg);
        resp.json(resposta)
    }
});

router.put("/", upload.single('arquivo'), function(req, resp, next){
    let resposta = new RespostaClass();

        GaleriaModel.editar(req.body, function(error, retorno){

            if(error){
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro."
                console.log("erro: ", error);
                deletarArquivo(req.body.caminho);
            }else{
                if(retorno.affectedRows > 0){
                    resposta.msg = "Cadastro editado com sucesso."
                }else{
                    resposta.erro = true;
                    resposta.msg = "Não foi possível editar o cadastro."
                    console.log("erro: ", error);
                    deletarArquivo(req.body.caminho);
                }
            }
            console.log('resp:', resposta);
            resp.json(resposta);
        });

});

router.get("/", function(req, resp, next){
    GaleriaModel.getTodos(function(error, retorno){
        let resposta = new RespostaClass();

        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro."
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }

        resp.json(resposta);
    });
});

router.get("/:id?", function(req, resp, next){
    GaleriaModel.getId(req.params.id, function(error, retorno){
        let resposta = new RespostaClass();

        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro."
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }

        resp.json(resposta);
    });
});

router.delete("/:id?", function(req, resp, next){
    GaleriaModel.deletar(req.params.id, function(error, retorno){
        let resposta = new RespostaClass();

        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro."
            console.log("erro: ", error);
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Resgistro excluído com sucesso."
            }else{
                resposta.erro = true;
                resposta.msg = "Não foi possível excluir o registro."
                console.log("erro: ", error);
                deletarArquivo(req.body.caminho);
            }
        }

        resp.json(resposta);
    });
});

module.exports = router;