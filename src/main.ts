import "./style.css";

const tarjetaImagen = document.getElementById("real-card") as HTMLImageElement;
const tarjetaImagen1 = document.getElementById("real-card-1") as HTMLImageElement;

const cartas = ['0','1','2','3','4','5'];

const numeroAleatorioCarta = (cartas: number): number => {
    return Math.floor(Math.random() * cartas);
}

function barajarCartas(cartas: string[]): string[] {
    for (let i= cartas.length - 1; i > 0; i--) {
        const c = numeroAleatorioCarta(i+1);
        [[cartas[i], cartas[c]] = [cartas[c], cartas[i]]];
    }
    return cartas;
}

console.log(barajarCartas(cartas));

const mostrarCarta = (carta:string) => {
    tarjetaImagen.src = '/images/' + numeroAleatorioCarta(cartas.length) + '.png';
    tarjetaImagen.alt = carta;
}

const mostrarCarta1 = (carta:string) => {
    tarjetaImagen1.src = '/images/' + numeroAleatorioCarta(cartas.length) + '.png';
    tarjetaImagen1.alt = carta;
}

tarjetaImagen.addEventListener('click', () => {
    const numeroCarta = cartas[numeroAleatorioCarta(cartas.length)];
    mostrarCarta(numeroCarta);
});

tarjetaImagen1.addEventListener('click', () => {
    const numeroCarta = cartas[numeroAleatorioCarta(cartas.length)];
    mostrarCarta1(numeroCarta);
});