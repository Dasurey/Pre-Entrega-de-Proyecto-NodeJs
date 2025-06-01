// Asurey, Dario Alexandre 

const url = `https://fakestoreapi.com/products`

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// POST

const createProduct = async ({ title, price, category }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                price: parseFloat(price),
                category
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// DELETE

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${url}/${productId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// Procesamiento de argumentos
const [, , method, resource, ...args] = process.argv;

if (method === 'GET') {
    if (resource === 'products') {
        fetchData(url);
    } else if (resource.startsWith('products/')) {
        const [, productId] = resource.split('/');
        fetchData(`${url}/${productId}`);
    }
} else if (method === 'POST' && resource === 'products') {
    const [title, price, category] = args;
    if (title && price && category) {
        createProduct({ title, price, category });
    } else {
        console.log('Faltan argumentos. Uso: npm run start POST products <title> <price> <category>');
    }
} else if (method === 'DELETE' && resource.startsWith('products/')) {
    const [, productId] = resource.split('/');
    if (productId) {
        deleteProduct(productId);
    } else {
        console.log('Falta el productId. Uso: npm run start DELETE products/<productId>');
    }
} else {
    console.log('Comando no reconocido.');
}