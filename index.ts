import bodyParser from "body-parser";
import Server from "./classes/server";
import router from "./routes/router";
import cors from "cors";


const server = new Server();

// BodyPaser
server.app.use( bodyParser.urlencoded({ extended:true }));
server.app.use( bodyParser.json() );

// Cors
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor Corriendo en el puerto ${ server.port }`);
});