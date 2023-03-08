// Vamos fazer um ciclo de interação, 
const botaoIniciarCamera = document.querySelector("[data-video-botao]"); // selecionei o botão de iniciar a câmera que é o rostinho 
const campoCamera = document.querySelector("[data-camera]"); // selecionei o campo onte tem a câmera
const video = document.querySelector("[data-video]"); // selecionei o campo de video
const botaoTirarFoto = document.querySelector("[data-tirar-foto]"); // selecionando o botão de tirar a foto
const canvas = document.querySelector("[data-video-canvas]"); // selecionando o canvas para guardar a foto
const mensagem = document.querySelector("[data-mensagem]"); // selecionando a mensagem de sucesso 

let imagemURL = ""; // criar a variável que vai guardar a foto


//agora vamos fazer a função que qdo clicar no botão camera, ele inicialize o video
// para isso vamos fazer um ouvinte de eventos, com o addEventListener:
botaoIniciarCamera.addEventListener("click", async function (){
   const iniciarVideo = await navigator.mediaDevices  // criar uma variável para iniciar pedir ao navegador iniciar a câmera. 
   .getUserMedia({video: true, audio: false});   // aqui estamo solicitando apenas o video e não o audio.

   botaoIniciarCamera.style.display = "none"; // aqui estamos colocando um estilo de desaparecer da tela, qdo a câmera aparece
   campoCamera.style.display = "block"; // aqui colocamos o block para que a camera apareça na tela

   video.srcObject = iniciarVideo;
})

// agora vamo fazer a função tirar foto:
botaoTirarFoto.addEventListener("click", function() {
   canvas.getContext('2d').drawImage(video, 0, 0, canvas.Width, canvas.height);

   imagemURL = canvas.toDataURL("image/jpeg"); // vai tirar a foto e guardar na variavel criada

   campoCamera.style.display = "none";
   mensagem.style.display = "block";
})