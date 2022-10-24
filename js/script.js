// Variaveis e seleção de elementos

const apiChave = "98aa04dae87ee9ff1135a71b64fc07f2";
const apiPaisURL = "https://countryflagsapi.com/png/";

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
const obterCidadeViaCep = async (cidade) => {
  const cep = fetch(`https://viacep.com.br/ws/${cidade}/json`); //faz o fetch

  cep
    .then((resolucao) => {
      console.log(resolucao);
      return resolucao.json(); //traz a resolução em json
    })
    .then((body) => {
      const cidade = body.localidade; // puxa o copo com a localidade(cidade)
      console.log(cidade);
    });
};

const obterClimaTempo = async (cidade) => {
  const apiClimaUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiChave}&lang=pt_br`;

  const res = await fetch(apiClimaUrl); // faz a fetch usando o "apiClimaUrl"
  const dados = await res.json(); //transforma a response do fetch em json
  return dados; // retorno os dados
};

const mostrarClimaTempo = async (cidade) => {
  cidade = cidadePesquisa.value; //puxa o valor digitado para variavel cidade

  const dados = await obterClimaTempo(cidade);
  const cidadeDoCep = await obterCidadeViaCep(cidade);

  console.log(cidadeDoCep);

  // temperaturaElement.innerText = `${parseInt(dados.main.temp)}°C`;
  // cidadeElement.innerText = dados.name;
  // paisIcone.setAttribute("src", apiPaisURL + dados.sys.country);
  // descricaoElement.innerText = dados.weather[0].description;
  // descricaoIcone.setAttribute(
  //   "src",
  //   `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
  // );
  // ventoElement.innerText = `${Math.trunc(dados.wind.speed)}KM/H`;
  // umidadeElement.innerText = `${dados.main.humidity} KM/H`;

  // climaTempoElement.classList.remove("ocultar");
  // climaTempoElement.classList.add("aparece-resul");
  // logo.classList.add("aparece-resul");
};

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

// function verificaNomeOuCep(cidade) {
//   if (typeof cidade == "string") {
//     console.log("é string");
//   } else {
//     console.log("é numero");
//   }
// }
