import { Tablero, Carta, cartas } from "./model";

const generarNumeroAleatorio = (indiceDelArray: number) =>
  Math.floor(Math.random() * (indiceDelArray + 1));

const barajarCartas = (cartas: Carta[]): Carta[] => {
  const copiaCartas = [...cartas];
  for (let indice = copiaCartas.length - 1; indice > 0; indice--) {
    let indiceAleatorio = generarNumeroAleatorio(indice);

    [copiaCartas[indice], copiaCartas[indiceAleatorio]] = [
      copiaCartas[indiceAleatorio],
      copiaCartas[indice],
    ];
  }
  return copiaCartas;
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
  const carta = tablero.cartas[indice];

    if (
      tablero.estadoPartida === "PartidaNoIniciada" ||
      tablero.estadoPartida === "DosCartasLevantadas" ||
      tablero.estadoPartida === "PartidaCompleta"
    ) {
      return false;
    }

    if (carta.encontrada) { return false }

    if (carta.estaVuelta) { return false }

  return true;
}

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
  const carta = tablero.cartas[indice];
    
    carta.estaVuelta = true;

    switch (tablero.estadoPartida) {
      case "CeroCartasLevantadas":
        tablero.estadoPartida = "UnaCartaLevantada";
        tablero.indiceCartaVolteadaA = indice;
        break;
      case "UnaCartaLevantada":
        tablero.estadoPartida = "DosCartasLevantadas";
        tablero.indiceCartaVolteadaB = indice;
        break;
      
      default: 
        break;
    }
}

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  if (!cartaA || !cartaB) { 
    return false 
  }
  
  return cartaA.idFoto === cartaB.idFoto;

}

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;

  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta"
  } else {
    tablero.estadoPartida = "CeroCartasLevantadas"
  }
}

export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  setTimeout(() => { 
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;

  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;

  tablero.estadoPartida = "CeroCartasLevantadas";
  }, 1000);
}

export const esPartidaCompleta = (tablero: Tablero) : boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
}

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas(cartas).map((carta) => ({
    ...carta,
    estaVuelta: false,
    encontrada: false,
  }));

  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};