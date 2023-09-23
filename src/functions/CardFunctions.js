import { Card } from '../model/Card.js'

export function geraDeck(quantidadeCartas) {
    const deckJogador = [];

    for (let i = 1; i <= quantidadeCartas; i++) {
        const nomeCarta = `Carta nome indice: ${i}`;
        const carta = new Card(nomeCarta, 1000, 800);
        deckJogador.push(carta);
    }
    return deckJogador;
}

export function criaCartasNoDeck(deckJogador) {
    var quantidadeDeck = 0;
    const zonaDeck = document.querySelector('.zone[data-zona="deck"]');
    for (const carta of deckJogador) {
        quantidadeDeck++;
        const cartaDiv = document.createElement("div");

        const quantidadeCartaDeck = document.createElement("span");
        quantidadeCartaDeck.textContent = quantidadeDeck;
        cartaDiv.appendChild(quantidadeCartaDeck);

        const nomeCarta = carta.nome;
        cartaDiv.setAttribute("data-nome", nomeCarta);
        cartaDiv.setAttribute("id", quantidadeDeck);

        const nomeCartaSpan = document.createElement("span");
        nomeCartaSpan.textContent = carta.nome;
        cartaDiv.appendChild(nomeCartaSpan);

        const ataqueCartaSpan = document.createElement("span");
        ataqueCartaSpan.textContent = `Ataque: ${carta.ataque}`;
        cartaDiv.appendChild(ataqueCartaSpan);

        const defesaCartaSpan = document.createElement("span");
        defesaCartaSpan.textContent = `Defesa: ${carta.defesa}`;
        cartaDiv.appendChild(defesaCartaSpan);

        cartaDiv.setAttribute("draggable", true);
        cartaDiv.style.position = "absolute";
        cartaDiv.style.zIndex = quantidadeDeck; 

        if (quantidadeDeck === deckJogador.length) {
            // Apenas a última div será visível
            cartaDiv.style.display = "block";
        } else {
            // Oculta as demais divs
            cartaDiv.style.display = "none";
        }

        cartaDiv.addEventListener("dragstart", dragStart);
        zonaDeck.appendChild(cartaDiv);
    }
}


export function criaCartasNaMao(maoDoJogador) {
    for (const carta of maoDoJogador) {
        criarCartaNaMao(carta);
    }
}

export function mostraProximaCarta(carta) {
    let ultimoIndice = carta.length - 1;

    if(ultimoIndice >= 0) {
        const cartaPresente = carta[ultimoIndice];
        cartaPresente.remove();
        // if(cartaPresente >= 0) {
            if(cartaPresente != null) {
            ultimoIndice--
            carta[ultimoIndice].style.display = "block";
        }
    }
}

function criarCartaNaMao(carta) {
    const maoJogadorDiv = document.getElementById("mao-jogador");
    const cartaDiv = document.createElement("div");
    cartaDiv.classList.add("card-in-mao");
    const nomeCarta = carta.nome;
    cartaDiv.setAttribute("data-nome", nomeCarta);
    cartaDiv.setAttribute("id", nomeCarta.replace(/\s+/g, '-').toLowerCase());

    const nomeCartaSpan = document.createElement("span");
    nomeCartaSpan.textContent = carta.nome;
    cartaDiv.appendChild(nomeCartaSpan);

    const ataqueCartaSpan = document.createElement("span");
    ataqueCartaSpan.textContent = `Ataque: ${carta.ataque}`;
    cartaDiv.appendChild(ataqueCartaSpan);

    const defesaCartaSpan = document.createElement("span");
    defesaCartaSpan.textContent = `Defesa: ${carta.defesa}`;
    cartaDiv.appendChild(defesaCartaSpan);

    cartaDiv.setAttribute("draggable", true);
    cartaDiv.addEventListener("dragstart", dragStart);
    maoJogadorDiv.appendChild(cartaDiv);
}
var cartaArrastada = null
function dragStart(event) {
    cartaArrastada = event.target;
    event.dataTransfer.setData("text", event.target.id);
}