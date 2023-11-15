import express from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import { Server as IOServer } from "socket.io";

const app = express();
const io = new IOServer(server);

const server = app.listen(8080, () => {
    console.log('escuchando en puerto 8080!')
  })

app.use(express.json());
app.use(urlencoded({extended: true}));


app.engine('handlebars', handlebars.engine());
app.set('views', '/views');
app.set('view engine', 'handlebars');


app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});



export function getIO() {
    return io;
}