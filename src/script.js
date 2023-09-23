import { iniciarJogo, dragOver, drop } from "./core/FluxoJogo.js";

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