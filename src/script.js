import { iniciarJogo, moverCartaDoDeckParaMao, dragOver, drop } from "./core/FluxoJogo.js";
import { virarParaCima, virarParaBaixo } from './functions/CardFunctions.js'

document.addEventListener("DOMContentLoaded", () => {
    iniciarJogo();

    const zonas = document.querySelectorAll(".zone");
    zonas.forEach(zona => {
        zona.addEventListener("dragover", dragOver);
        zona.addEventListener("drop", event => {
            const zonaData = zona.getAttribute("data-zona");
            drop(event, zonaData);
        });
    });
});

const zonaDeck = document.querySelector('.zone[data-zona="deck"]');
zonaDeck.addEventListener("click", () => moverCartaDoDeckParaMao());

const botaoCardParaCima = document.getElementById("botao-modal-virado-para-cima");
botaoCardParaCima.addEventListener("click", () => virarParaCima())

const botaoCardParaBaixo = document.getElementById("botao-modal-virado-para-baixo");
botaoCardParaBaixo.addEventListener("click", () => virarParaBaixo())
