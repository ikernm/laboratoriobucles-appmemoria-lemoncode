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

const errorVoltearCarta = (indice: number) => {
  if (!sePuedeVoltearLaCarta(tablero, indice)) {
        const carta = tablero.cartas[indice];
        console.log("Bloqueo -> estado:", tablero.estadoPartida, 
              "estaVuelta:", carta.estaVuelta, 
              "encontrada:", carta.encontrada);
        document.getElementById("esLaMismaCarta")?.classList.remove("noVisible");
        return true;
      }
  return false;
}

const errorVoltearMasDeDosCartas = () => {
  if (tablero.estadoPartida !== "DosCartasLevantadas") {
          return
        }
}

const errorCartasVolteadasAyB = () => {
  const a = tablero.indiceCartaVolteadaA;
  const b = tablero.indiceCartaVolteadaB;

  if (a === undefined || b === undefined) {
    return
  }
}

const parejasCorrectasYPartidasCompleta = () => {
  const a = tablero.indiceCartaVolteadaA;
  const b = tablero.indiceCartaVolteadaB;
  if (a !== undefined && b !== undefined) {
    if (sonPareja(a, b, tablero)) {
      parejaEncontrada(tablero, a, b);
    
      if (esPartidaCompleta(tablero)) {
          document.getElementById("parrafoGanado")?.classList.remove("noVisible");
      }
      return;
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

export const crearTablero = () => {
  for (let indice = 0; indice < cartas.length; indice++) {
    const dataIndiceId = `[data-indice-id="${indice}"]`;
    const elementoDiv = document.querySelector(`div${dataIndiceId}`);

    if (elementoDiv && elementoDiv instanceof HTMLDivElement) {
        elementoDiv.addEventListener('click', () => { 
        
        if (errorVoltearCarta(indice)) {
          return
        }

        voltearLaCarta(tablero, indice);
        pintarCartas();

        const a = tablero.indiceCartaVolteadaA;
        const b = tablero.indiceCartaVolteadaB;

        errorCartasVolteadasAyB();
        errorVoltearMasDeDosCartas();
        parejasCorrectasYPartidasCompleta();
        
        if (a !== undefined && b !== undefined) {
          parejaNoEncontrada(tablero, a, b);
          setTimeout(() => pintarCartas(), 1000);
        }
      })
    }
  }
}