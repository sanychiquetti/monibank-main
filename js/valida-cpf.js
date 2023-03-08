//vamos tirar os caracteres especiais, se o cliente digitou com eles
// export default quer dizer que vou exportar como padrão, 
// qdo chamar esse arquivo ela que vai ser retornada
// criamos a variavel cpf com um replace, que recebe dois parâmetros
//1 o que vamos substituir, o 2 pelo que vamos substituir
export default function ehUmCPF(campo) {
   const cpf = campo.value.replace(/\.|-/g, ""); // aqui estou pegando os caractres especiais e removendo e substituindo por nada
   if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)){ // aqui chamamos a função de validar os números repetidos, o primeiro e segundo digito
      campo.setCustomValidity('Esse CPF não é válido!');
   }
}
// para ela funcionar, devemos exportar essa função para o script

// vamos validar realmente esse campo cpf, se não tem numeros repetidos:
function validaNumerosRepetidos(cpf){
   const numeroRepetidos = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999'
   ]

   return numeroRepetidos.includes(cpf); //aqui vemos se realmente não consta a repetição acima
}

//Validar o primeiro digito:
function validaPrimeiroDigito(cpf){
   let soma = 0;            //criar variável soma
   let multiplicador = 10;  //criar variável multiplicador

 //vamos pegar os 9 primeiros digitos do cpf,criar um laço de repetição para todos esses 9 digitos
   for(let tamanho = 0; tamanho < 9; tamanho++){
      soma += cpf[tamanho] * multiplicador; // ela vai pegar a variável soma, que demos valor 0, e começar a * pelo valor do multiplicador, que demos o valor 10
      multiplicador--;  // ele vai diminuir o multiplicador: 10,9,8,7.... e no final somar esses valores (vide resumo no "notes"))
   }

   soma = (soma * 10) % 11;  // aqui ele vai pegar a soma e * por 10 e dividir por 11

   if (soma == 10 || soma == 11){  // aqui estamos pedindo para que compare a soma com 10 e com 11
      soma = 0;                    // se o resultado der 10 ou 11, então seria = a 0, o que tornaria inválido.  
   }

   return soma != cpf[9];

}

// Validar o segundo digito:
function validaSegundoDigito(cpf){
   let soma = 0;            //criar variável soma
   let multiplicador = 11;  //criar variável multiplicador

 //vamos pegar os 9 primeiros digitos do cpf,criar um laço de repetição para todos esses 10 digitos
   for(let tamanho = 0; tamanho < 10; tamanho++){
      soma += cpf[tamanho] * multiplicador; // ela vai pegar a variável soma, que demos valor 0, e começar a * pelo valor do multiplicador, que demos o valor 10
      multiplicador--;  // ele vai diminuir o multiplicador: 10,9,8,7.... e no final somar esses valores (vide resumo no "notes"))
   }

   soma = (soma * 10) % 11;  // aqui ele vai pegar a soma e * por 10 e dividir por 11

   if (soma == 10 || soma == 11){  // aqui estamos pedindo para que compare a soma com 10 e com 11
      soma = 0;                    // se o resultado der 10 ou 11, então seria = a 0, o que tornaria inválido.  
   }

   return soma != cpf[10];

}
