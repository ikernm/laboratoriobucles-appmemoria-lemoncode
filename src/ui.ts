import { cartas } from './model';

export const crearTablero = () => {
  for (let indice = 0; indice < cartas.length; indice++) {
    const dataIndiceId = `[data-indice-id="${indice}"]`;
    const elementoDiv = document.querySelector(`div${dataIndiceId}`);

    if (elementoDiv && elementoDiv instanceof HTMLDivElement) {
      elementoDiv.addEventListener('click', () => {
        const elementoImg = document.querySelector(`img${dataIndiceId}`);

        if (elementoImg && elementoImg instanceof HTMLImageElement) {
          elementoImg.src = cartas[indice].imagen
        }
      })
    }
  }
}

