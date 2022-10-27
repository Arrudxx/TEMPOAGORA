// Variaveis e seleção de elementos

const apiChave = "98aa04dae87ee9ff1135a71b64fc07f2";
const apiPaisURL = "https://countryflagsapi.com/png/";

const estrelas = document.querySelector(".estrelas");
const ocultarEstrelas = document.querySelector(".ocultar-estrelas");
const divClimaFalha = document.querySelector("#clima-dados-falha");

const FormularioElement = document.querySelector("#from");
const divPesquisa = document.querySelector("#pesquisa");
const cidadePesquisa = document.querySelector("#cidade-input");
const btnPesquisa = document.querySelector("#search");

const climaTempoElement = document.querySelector(".ocultar");

const temperaturaElement = document.querySelector("#temperatura span");
const cidadeElement = document.querySelector("#cidade");
const paisIcone = document.querySelector("#pais");
const descricaoElement = document.querySelector("#descricao");
const descricaoIcone = document.querySelector("#icone-descricao");
const ventoElement = document.querySelector("#descricao-tempo span");
const umidadeElement = document.querySelector("#descricao-umidade span");

// funções

const obterClimaTempo = async (cidade) => {
  const apiClimaUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiChave}&lang=pt_br`;

  const res = await fetch(apiClimaUrl); // faz a fetch usando o "apiClimaUrl"
  const dados = await res.json(); //transforma a response do fetch em json
  return dados; // retorno os dados
};

function pesquisaNaoEncontrada(erro) {
  if (erro.cod == 404) {
    logo.classList.add("aparece-resul");
    climaTempoElement.classList.add("ocultar");
    divClimaFalha.style.display = "flex";
  } else {
    divClimaFalha.style.display = "none";
  }
}

function trataHorario(dados) {
  const timezone = {
    //FAZER METODOS COM O NOMES DA TIMEZONE E COM RETURN O VALOR DAS TIMEZONES
  };

  console.log(dados.timezone);
  let horarioAtual = new Date().getHours();
  console.log(horarioAtual);
  //FAZER FOREACH PELO OBJETO TIMEZONE E CRIAR LOGICA PARA DADOS.TIMEZONE BATER COM TIMEZONE.METHOD E ASSIM ALTERAR O HORARIO ATUAL PARA HOARARIO LOCAL DA CIDADE
}

const mostrarClimaTempo = async (cidade) => {
  cidade = cidadePesquisa.value; //puxa o valor digitado para variavel cidade
  const dados = await obterClimaTempo(cidade);
  pesquisaNaoEncontrada(dados);
  trataHorario(dados);

  temperaturaElement.innerText = `${parseInt(dados.main.temp)}°C`;
  cidadeElement.innerText = dados.name;
  paisIcone.setAttribute("src", apiPaisURL + dados.sys.country);
  descricaoElement.innerText = dados.weather[0].description;
  descricaoIcone.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
  );
  ventoElement.innerText = `${Math.trunc(dados.wind.speed)}KM/H`;
  umidadeElement.innerText = `${dados.main.humidity} KM/H`;

  climaTempoElement.classList.remove("ocultar");
  climaTempoElement.classList.add("aparece-resul");
  logo.classList.add("aparece-resul");
};

function mudaFundoPelaHora() {
  let horarioAtual = new Date().getHours();
  const body = document.body;

  if (7 <= horarioAtual && horarioAtual < 9) {
    body.classList.add("nove-manha");
  } else if (9 <= horarioAtual && horarioAtual < 12) {
    body.classList.add("doze-manha");
  } else if (12 <= horarioAtual && horarioAtual < 15) {
    body.classList.add("tres-tarde");
  } else if (17 <= horarioAtual && horarioAtual < 19) {
    body.classList.add("cinco-tarde");
  } else if (19 <= horarioAtual && horarioAtual < 21) {
    body.classList.add("sete-noite");
    estrelas.classList.remove("ocultar-estrelas");
  } else if (21 <= horarioAtual && horarioAtual <= 23) {
    body.classList.add("nove-noite");
    estrelas.classList.remove("ocultar-estrelas");
  } else if (0 <= horarioAtual && horarioAtual < 5) {
    body.classList.add("doze-noite");
    estrelas.classList.remove("ocultar-estrelas");
  } else {
    body.classList.add("cinco-manha");
  }
}

// Eventos

//Evento para clck no botão
btnPesquisa.addEventListener("click", (e) => {
  e.preventDefault();

  mostrarClimaTempo();
});

// Evento para dar enter ao em vez de clulcar no botão
cidadePesquisa.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();

    mostrarClimaTempo();
  }
});

mudaFundoPelaHora();
