// vamos importar os arquivos de validação:
import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

// Aqui estamos selecionando os campos que contem o required:
const camposDoFormulario = document.querySelectorAll("[required]");
// Aqui vamos criar uma variável para enviar o formulário:
const formulario = document.querySelector("[data-formulario]");

//Vamos criar a função de enviar o formulário:
formulario.addEventListener("submit", (e) =>{ // colocamos uma escuta, que qdo for enviar o formulario
   e.preventDefault();  //ele por padrão deve fazer um preventDefaul, que é um reloud e regreson

   const listaRespostas = {         //criamos uma lista de respostas que navega entre os campos do formulario, pegando os valores inseridos
      "nome": e.target.elements["nome"].value,
      "email": e.target.elements["email"].value,
      "rg": e.target.elements["rg"].value,
      "cpf": e.target.elements["cpf"].value,
      "aniversario": e.target.elements["aniversario"].value
   }
      //depois de pegar esses valores e salvar em uma lista, fizemos o armazenamento local
   localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

   window.location.href = './abrir-conta-form-2.html';
})

// Aqui estamos dando um nome de campo para cada required da lista,
// e que se clicado fora desse campo, vai criar um gatilho para acontecer 
// um evento que colocamos o nome de verificaCampo - com o campo espefícico dentro
camposDoFormulario.forEach((campo) => {
   campo.addEventListener("blur", () => verificaCampo(campo));
   campo.addEventListener("invalid", evento => evento.preventDefault()); // aqui estamos tirando a pop-up, que o js tem como padrão, para fazermos nossa propria validação
})

//vairáveis de erros:
const tiposDeErro = [
   'valueMissing', // qdo não tem nada dentro do campo
   'typeMismatch',   //qdo não corresponde com o tipo de campo com o dado que esta sendo inserido, exemplo email... precisa do @
   'patternMismatch', // no cpf por exemplo, que tem qdade de caracteres 
   'tooShort', //qdo os dados inseridos não tem caracteres mínimos.
   'customError'  // qdo não corresponde com as customizações que fizemos para validar os campos 
]

//vamos criar mensagens customizadas para cada erro:
const mensagens = {
   nome: {
       valueMissing: "O campo de nome não pode estar vazio.",
       patternMismatch: "Por favor, preencha um nome válido.",
       tooShort: "Por favor, preencha um nome válido."
   },
   email: {
       valueMissing: "O campo de e-mail não pode estar vazio.",
       typeMismatch: "Por favor, preencha um email válido.",
       tooShort: "Por favor, preencha um e-mail válido."
   },
   rg: {
       valueMissing: "O campo de RG não pode estar vazio.",
       patternMismatch: "Por favor, preencha um RG válido.",
       tooShort: "O campo de RG não tem caractéres suficientes."
   },
   cpf: {
       valueMissing: 'O campo de CPF não pode estar vazio.',
       patternMismatch: "Por favor, preencha um CPF válido.",
       customError: "O CPF digitado não existe.",
       tooShort: "O campo de CPF não tem caractéres suficientes."
   },
   aniversario: {
       valueMissing: 'O campo de data de nascimento não pode estar vazio.',
       customError: 'Você deve ser maior que 18 anos para se cadastrar.'
   },
   termos: {
       valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
   }
}

// Aqui criamos o evento verificaCampo:
function verificaCampo(campo) {

   let mensagem = ""; // aqui criamos a variável para mensagem de erro
   campo.setCustomValidity(''); // aqui tiramos a mensagem de erro, se campo valido
   if(campo.name == "cpf" && campo.value.length >= 11){  // aqui verifica o cpf
      ehUmCPF(campo);      
   }

   if(campo.name == "aniversario" && campo.value != ""){ // aqui verifica a data nascimento 
      ehMaiorDeIdade(campo);      
   }
   tiposDeErro.forEach(erro => { // o forEach vai executar uma função para cada erro da lista
      if (campo.validity[erro]){ // aqui verificamos se o campo está valido com true, se estiver true, então tem uma mensagem, mas vai estar vazia
         mensagem = mensagens[campo.name][erro]; // aqui vamos substituir essa mensagem vazia pelo erro correspondente, com o nome do campo e o erro
         console.log(mensagem);
      }
   })
// agora vamos lincar com a classe no html:
   const mensagemErro = campo.parentNode.querySelector('mensagem-erro'); //criar variável mensagemErro, pegando apenas o span perto desse input com parenteNode
   const validadorDeInput = campo.checkValidity(); //criamos a variável validador de input, e aqui vamos checar se o campo está valido ou não

   if (!validadorDeInput){   // SE o campo estiver não estiver válido ele imprime a mesagem de erro 
      mensagemErro.textContent = mensagem;      
   } else {                   // se não ele não imprime nada
      mensagemErro.textContent = "";
   }
}