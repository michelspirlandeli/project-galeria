import { configClass } from '../classes/configClass'

let caminho = `${configClass.getUrlApi().toString()}/galeria/`;

export default class GaleriaService{
    constructor(){
    }

    static getTodos(){
        return fetch(caminho).then(response => {
           return response.json(); 
        })
    }

    static getId(id){
        return fetch(`${caminho}/${id}`).then(response => {
           return response.json(); 
        })
    }

    static adicionar(formData){
        return fetch(caminho,
            {
                method: "POST",
                body: formData
            }
        ).then(response => {
           return response.json(); 
        })
    }

    static editar(formData){
        return fetch(caminho,
            {
                method: "PUT",
                body: formData
            }
        ).then(response => {            
           return response.json();
        })
    }

    static deletar(id){
        return fetch(`${caminho}/${id}`,
            {
                method: "DELETE"
            }
        ).then(response => {            
           return response.json();
        })
    }
}