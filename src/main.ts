import "./style.css";

const tarjetaImagen = document.getElementById("real-card") as HTMLImageElement;

const cartas = ['🦁','🦉','🐶','🐔','🐷','🐝'];

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

tarjetaImagen.addEventListener('click', () => {
    const cartaAleatoria = cartas[Math.floor(Math.random() * cartas.length)];
    tarjetaImagen.src = '/images/' + cartaAleatoria + '.png';
    mostrarCarta(cartaAleatoria);
});