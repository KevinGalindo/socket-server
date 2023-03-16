import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { Server as serverIO } from 'socket.io';
import http from 'http';
import * as socket from "../sockets/socket";


export default class Server{
    private static _instance: Server;

    public app:express.Application;
    public port:number;

    public io: serverIO;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = new serverIO(this.httpServer);

        this.listenSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
            
            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar(cliente);

        });
    }

    start( callback: () => void ): void{
        this.httpServer.listen( this.port, callback );
    }
}