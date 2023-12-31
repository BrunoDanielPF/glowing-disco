import { geraDeck, criaCartasNoDeck, criaCartasNaMao, mostraProximaCarta } from '../functions/CardFunctions.js';
/**
 *  Adiciona 5 cartas na mão do jogador
 *  Remove uma carta do deck e adiciona na mão
 *  cria as cartas da mão e no deck.
 */
export function iniciarJogo() {
    const maoDoJogador = [];
    const deckJogador = geraDeck(40);
    for (let i = 1; i <= 5; i++) {
        maoDoJogador.push(deckJogador.pop());
    }
    criaCartasNoDeck(deckJogador);
    criaCartasNaMao(maoDoJogador);
    geraDeck();
}

export function moverCartaDoDeckParaMao(event) {
    const cartasDeck = document.querySelectorAll('.zone[data-zona="deck"]');

    cartasDeck.forEach((carta) => {
        var divCarta = carta.children;
        const divCartaArray = Array.from(divCarta);
        mostraProximaCarta(divCartaArray);
    });
}

export function dragOver(event) {
    event.preventDefault();
}

export function drop(event, zona) {
    event.preventDefault();
    const cartaId = event.dataTransfer.getData("text");
    const zonaTabuleiro = document.querySelector(`.zone[data-zona="${zona}"]`);
    const cartaOriginal = document.getElementById(cartaId);

    if (cartaOriginal) {
        const cartaDiv = document.createElement("div");
        cartaDiv.classList.add("card-in-mao");
        cartaDiv.style.width = cartaOriginal.style.width;
        cartaDiv.style.height = cartaOriginal.style.height;
        cartaDiv.style.backgroundColor = cartaOriginal.style.backgroundColor;
        cartaDiv.textContent = cartaOriginal.getAttribute("data-nome");
        zonaTabuleiro.appendChild(cartaDiv);
        cartaOriginal.remove();
    }
}