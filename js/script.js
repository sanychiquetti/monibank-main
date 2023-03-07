// vamos importar o arquivo ehUmCPF do valida-cpf:
import ehUmCPF from "./valida-cpf.js";

// Aqui estamos selecionando os campos que contem o required:
const camposDoFormulario = document.querySelectorAll("[required]");

// Aqui estamos dando um nome de campo para cada required da lista,
// e que se clicado fora desse campo, vai criar um gatilho para acontecer 
// um evento que colocamos o nome de verificaCampo - com o campo espefícico dentro
camposDoFormulario.forEach((campo) => {
   campo.addEventListener("blur", () => verificaCampo(campo));
})

// Aqui criamos o evento verificaCampo:
function verificaCampo(campo) {
   if(campo.name == "cpf" && campo.value.length >= 11){
      ehUmCPF(campo);      
   }
}