import { Socket } from "socket.io";
import { Server as serverIO } from 'socket.io';


export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: serverIO ) => {

    cliente.on('mensaje', ( payload: {de: string, cuerpo:string} ) =>{

        console.log( 'Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload);

    });

}