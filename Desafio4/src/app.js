import express, { urlencoded } from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import { Server as IOServer } from "socket.io";
import {ProductManager} from "./ProductManager.js";

const app = express();
const server = app.listen(8080, () => {
    console.log('escuchando en puerto 8080!')
  })
const io = new IOServer(server);
const pm = new ProductManager('Desafio4/db/products.json');

app.use(express.json());
app.use(urlencoded({extended: true}));


app.engine('handlebars', handlebars.engine());
app.set('views', 'Desafio4/views');
app.set('view engine', 'handlebars');

app.use('/public',express.static('Desafio4/public'))
app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    socket.emit ('newProduct', {products: pm.getProducts()})

    socket.on('newProduct', async (producto, callback) => {
        const respuesta = await pm.addProduct(producto)
        callback({status: respuesta}) 
        io.sockets.emit('newProduct', {products: pm.getProducts()})    
    });
});


export {pm}
export function getIO() {
    return io;
}