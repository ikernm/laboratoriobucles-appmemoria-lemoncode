import { cartas, tablero } from './model';
import { 
  iniciaPartida, 
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada, 
  esPartidaCompleta
} from './motor';

export const crearTablero = () => {
  for (let indice = 0; indice < cartas.length; indice++) {
    const dataIndiceId = `[data-indice-id="${indice}"]`;
    const elementoDiv = document.querySelector(`div${dataIndiceId}`);

    if (elementoDiv && elementoDiv instanceof HTMLDivElement) {
      elementoDiv.addEventListener('click', () => {  
        if (!sePuedeVoltearLaCarta(tablero, indice)) {
        const carta = tablero.cartas[indice];
        console.log("Bloqueo -> estado:", tablero.estadoPartida, 
              "estaVuelta:", carta.estaVuelta, 
              "encontrada:", carta.encontrada);
        document.getElementById("esLaMismaCarta")?.classList.remove("noVisible");
        return;
      }
      
        voltearLaCarta(tablero, indice);
        pintarCartas();
      
        if (tablero.estadoPartida !== "DosCartasLevantadas") {
          return
        }

        const { indiceCartaVolteadaA: a, indiceCartaVolteadaB: b } = tablero;
        if (a === undefined || b === undefined) {
          return
        }

        if (sonPareja(a, b, tablero)) {
        parejaEncontrada(tablero, a, b);
        

        if (esPartidaCompleta(tablero)) {
          document.getElementById("parrafoGanado")?.classList.remove("noVisible");
        }
        return;
      }
        parejaNoEncontrada(tablero, a, b);
        setTimeout(() => pintarCartas(), 1000);
      })
    }
  }
}

const botonEmpezar = document.getElementById("botonEmpezarPartida") as HTMLButtonElement;

export const pintarCartas = (): void => {
  tablero.cartas.forEach((carta, indice) => {
    const img = document.querySelector(`img[data-indice-id="${indice}"]`) as HTMLImageElement;
    if (carta.estaVuelta || carta.encontrada) {
      img.src = tablero.cartas[indice].imagen;
    } else {
      img.removeAttribute("src");
    }
  });
};

botonEmpezar.addEventListener("click", () => {
  iniciaPartida(tablero);
  pintarCartas();
});


