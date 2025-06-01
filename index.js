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

const createProduct = async (url, title, price, category) => {
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

const deleteProduct = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// GET

const [,, method, resource, title, price, category] = process.argv;

if (method === 'GET') {
    if (resource === 'products') {
        fetchData(url);
    } else if (resource.startsWith('products/')) {
        const productId = resource.split('/')[1];
        fetchData(`${url}/${productId}`);
    }
} else if (method === 'POST' && resource === 'products') {
    if (title && price && category) {
        createProduct(url, title, price, category);
    } else {
        console.log('Faltan argumentos. Uso: npm run start POST products <title> <price> <category>');
    }
} else if (method === 'DELETE' && resource.startsWith('products/')) {
    const productId = resource.split('/')[1];
    if (productId) {
        deleteProduct(`${url}/${productId}`);
    } else {
        console.log('Falta el productId. Uso: npm run start DELETE products/<productId>');
    }
}