import { Card } from '../model/Card.js'

const commonsComponents = {
    divMaoJogador : document.getElementById("mao-jogador"),
    modal : document.getElementById("modal")
}

export function geraDeck(quantidadeCartas) {
    const deckJogador = [];
//TODO: atribuir decks sobre cartas reais(customizadas, api open source ou alguma outra ideia)
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
        cartaDiv.className = "card-in-deck";
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
        const maoJogadorDiv = commonsComponents.divMaoJogador
        const cartaPresente = carta[ultimoIndice];
        if(cartaPresente) {
            cartaPresente.style.position = "";
            cartaPresente.classList.add("card-in-mao");
            maoJogadorDiv.appendChild(cartaPresente);
        }
        //TODO : revisar trecho de codigo
        // cartaPresente.remove(); // remover o node removendo da mao do jogador tbm
        // if(cartaPresente >= 0) {
        ultimoIndice--
        if (ultimoIndice >= 0) {
            carta[ultimoIndice].style.display = "block";
        }
    }
}

function criarCartaNaMao(carta) {   
    const maoJogadorDiv = commonsComponents.divMaoJogador
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
    if (event.target.classList.contains("card-in-mao"))
        mostrarModal();

    cartaArrastada = event.target;
    event.dataTransfer.setData("text", event.target.id);
}

document.addEventListener("dragend", function (event) {
    // cartaArrastada = null;
});

/**
 * funcao usada no html em modal
 */
export function virarParaCima() {
    if (cartaArrastada) {
        cartaArrastada.style.backgroundColor = "white";
        esconderModal();
    }
}

/**
 * funcao usada no html em modal
 */
export function virarParaBaixo() {
    if (cartaArrastada) {
        cartaArrastada.style.backgroundColor = "black";
        esconderModal();
    }
}

const mostrarModal = () => commonsComponents.modal.style.display = "block";
const esconderModal = () => commonsComponents.modal.style.display = "none";