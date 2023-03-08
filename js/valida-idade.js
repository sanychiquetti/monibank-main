export default function ehMaiorDeIdade(campo){
   const dataNascimento = new Date(campo.value); // criamos um new date para converter a data que receber do usuário numa linguagem que js entenda.
   if (!validaIdade(dataNascimento)){
      campo.setCustomValidity('O usuário não é maior de idade');
   }
}

// aqui vamos criar a função apra validar a data de nascimento, pois não pode ser menores de idade
function validaIdade(data){
   const dataAtual = new Date();    //aqui ele vai pegar a data atual do dia
   const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()); // aqui estamos pegando a data,dia, mes e ano digitado e colocando + 18,

   return dataAtual >= dataMais18;   // aqui estamos fazendo a comparação da data inserida +18 com a data do dia, se for maoir ou igual, ele pode se cadastrar.
}