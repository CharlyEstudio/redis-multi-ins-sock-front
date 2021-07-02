import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable()
export class SocketService {
  constructor(
    private readonly socket: Socket
  ) {
    this.checarEstatusConexion();
  }

  checarEstatusConexion() {
    this.socket.on('connect', () => {
      console.log(`Conectado ${this.socket.ioSocket.id}`);
    });

    this.socket.on('disconnect', (reason: any) => {
      console.log(`Desconectado`);
    });
  }

  accionAServidor( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback);
  }
  escucharDeServidor( evento: string ) {
    return this.socket.fromEvent(evento);
  }
}
