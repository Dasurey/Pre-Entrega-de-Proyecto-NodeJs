const precios = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

function calcularElIVAdeLosPrecios(precios) {
    const IVA = 0.21;
    
    return precios.map(precio => precio * IVA);
}

const preciosConIVA = calcularElIVAdeLosPrecios(precios);

preciosConIVA.forEach((valor) => {
    console.log(`El precio es: ${valor}- IVA incluido.`);
});