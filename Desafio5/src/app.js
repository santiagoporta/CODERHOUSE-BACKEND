import express, { urlencoded } from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import { Server as IOServer } from "socket.io";
import {ProductManager} from "./services/ProductManager.js";

const app = express();
const server = app.listen(8080, () => {
    console.log('escuchando en puerto 8080!')
  })
const io = new IOServer(server);
const pm = new ProductManager('SegundaPreEntrega/db/products.json');

app.use(express.json());
app.use(urlencoded({extended: true}));


app.engine('handlebars', handlebars.engine());
app.set('views', 'SegundaPreEntrega/views');
app.set('view engine', 'handlebars');

app.use('/public',express.static('SegundaPreEntrega/public'))
app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    const productos = async () =>{
        return await pm.getProducts();
      }
      productos()
    socket.emit ('newProduct', {products: productos()})
    socket.on('newProduct',  async function(producto) {
        try{
            console.log(producto,"algo")
            await pm.addProduct(producto)
            const productos = await pm.getProducts()
            console.log(productos)
            io.sockets.emit('newProduct', productos)    
        }   catch(error) {
            return error
        }
    });
});


export {pm}
export function getIO() {
    return io;
}