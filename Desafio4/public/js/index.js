const socket = io();
const button = document.getElementById('boton')

button.onclick = function formulario() {
    const product = { 
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    status: document.getElementById("status").value }
    socket.emit('newProduct', product)
}

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.on('newProduct', (product) => {
    const productList = document.getElementById('productList');
    const productItem = createProductItem(product[product.length - 1]);
    if (productItem !== undefined) {
        productList.appendChild(productItem);
    }
});

// socket.on('deleteProduct', (pid) => {
//     console.log('Producto eliminado:', pid);
//     const productList = document.getElementById('productList');
//     const productItem = document.getElementById(`product-${pid}`);
//     if (productItem) {
//         productList.removeChild(productItem);
//     }
// });

function createProductItem(product) {
    if (!product) {
        return
    }
    const productItem = document.createElement('div');
    productItem.id = `product-${product.id}`;
    productItem.innerHTML = `
        <p>-----------------------------------------</p>
        <p>Title: ${product.title}</p>
        <p>Description: ${product.description}</p>
        <p>Category: ${product.category}</p>
        <p>Price: ${product.price}</p>
        <img src="${product.thumbnail}" alt="${product.title}">
        <p>Code: ${product.code}</p>
        <p>Stock: ${product.stock}</p>
        <p>Status: ${product.status}</p>
        <p>Id: ${product.id}</p>
        <p>-----------------------------------------</p>
    `;
    return productItem;
}