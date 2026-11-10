const perguntas = [
  {
    pergunta: "Quantos jogadores de cada equipe ficam em campo no início de uma partida oficial de futebol?",
    opcoes: ["9 jogadores", "10 jogadores", "11 jogadores", "12 jogadores"],
    resposta: 2,
    explicacao: "Cada equipe começa a partida com 11 jogadores em campo."
  },
  {
    pergunta: "Em qual esporte é utilizado o termo 'ace' para um saque que o adversário não consegue tocar?",
    opcoes: ["Tênis", "Basquete", "Vôlei de praia", "Handebol"],
    resposta: 0,
    explicacao: "No tênis, um ace acontece quando o saque é válido e o adversário não consegue tocar na bola."
  },
  {
    pergunta: "Quantos pontos vale uma cesta convertida de fora da linha de três pontos no basquete?",
    opcoes: ["1 ponto", "2 pontos", "3 pontos", "4 pontos"],
    resposta: 2,
    explicacao: "Uma cesta convertida de fora da linha de três pontos vale três pontos."
  },
  {
    pergunta: "Em qual país foram realizados os Jogos Olímpicos de 2016?",
    opcoes: ["China", "Brasil", "Reino Unido", "Japão"],
    resposta: 1,
    explicacao: "Os Jogos Olímpicos de 2016 aconteceram no Rio de Janeiro, Brasil."
  },
  {
    pergunta: "Qual é a distância oficial de uma maratona?",
    opcoes: ["21,097 km", "30 km", "42,195 km", "50 km"],
    resposta: 2,
    explicacao: "A maratona tem 42,195 quilômetros."
  }
];

let indiceAtual = 0;
let pontos = 0;
let respondida = false;

const elementoPergunta = document.querySelector("#pergunta");
const elementoOpcoes = document.querySelector("#opcoes");
const elementoContador = document.querySelector("#contador");
const elementoPontuacao = document.querySelector("#pontuacao");
const elementoMensagem = document.querySelector("#mensagem");
const elementoBarra = document.querySelector("#barra-progresso");
const botaoProximo = document.querySelector("#proximo");

function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  respondida = false;
  elementoPergunta.textContent = atual.pergunta;
  elementoContador.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  elementoPontuacao.textContent = `Pontos: ${pontos}`;
  elementoBarra.style.width = `${(indiceAtual / perguntas.length) * 100}%`;
  elementoMensagem.textContent = "";
  botaoProximo.disabled = true;
  botaoProximo.textContent = indiceAtual === perguntas.length - 1
    ? "Ver resultado" : "Próxima pergunta";
  elementoOpcoes.replaceChildren();

  atual.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.type = "button";
    botao.textContent = opcao;
    botao.addEventListener("click", () => selecionarResposta(indice, botao));
    elementoOpcoes.appendChild(botao);
  });
}

function selecionarResposta(indiceEscolhido, botaoEscolhido) {
  if (respondida) return;
  respondida = true;

  const atual = perguntas[indiceAtual];
  const botoes = [...elementoOpcoes.querySelectorAll("button")];
  botoes.forEach((botao, indice) => {
    botao.disabled = true;
    if (indice === atual.resposta) botao.classList.add("correta");
  });

  if (indiceEscolhido === atual.resposta) {
    pontos++;
    elementoMensagem.textContent = `Muito bem! ${atual.explicacao}`;
  } else {
    botaoEscolhido.classList.add("errada");
    elementoMensagem.textContent = `Não foi dessa vez. ${atual.explicacao}`;
  }

  elementoPontuacao.textContent = `Pontos: ${pontos}`;
  botaoProximo.disabled = false;
}

function mostrarResultado() {
  elementoBarra.style.width = "100%";
  elementoContador.textContent = "Quiz concluído";
  elementoPergunta.textContent = `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
  elementoOpcoes.replaceChildren();

  const resultado = document.createElement("p");
  resultado.className = "mensagem";
  resultado.textContent = pontos === perguntas.length
    ? "Excelente! Você conhece muito de esportes!"
    : pontos >= 3
      ? "Bom trabalho! Continue aprendendo sobre esportes."
      : "Continue praticando! Você pode tentar novamente.";
  elementoOpcoes.appendChild(resultado);

  botaoProximo.textContent = "Jogar novamente";
  botaoProximo.disabled = false;
  elementoMensagem.textContent = "";
}

botaoProximo.addEventListener("click", () => {
  if (indiceAtual < perguntas.length - 1) {
    indiceAtual++;
    mostrarPergunta();
  } else if (indiceAtual === perguntas.length - 1 && respondida) {
    mostrarResultado();
    indiceAtual++;
  } else {
    indiceAtual = 0;
    pontos = 0;
    mostrarPergunta();
  }
});

const botaoOriginal = botaoProximo;
botaoOriginal.addEventListener("click", () => {
  if (indiceAtual === perguntas.length) {
    indiceAtual = 0;
    pontos = 0;
    mostrarPergunta();
  }
});

mostrarPergunta();
