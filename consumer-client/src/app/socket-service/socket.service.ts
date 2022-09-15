import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  SERVER_URL:string = 'ws://localhost:3001/'
  socket: Socket;
  constructor() {
    this.socket = io(this.SERVER_URL,  { transports : ['websocket'] });
  }
  public Connect(){
    this.socket.connect();
  }
  public Close(){
    if(this.socket.connected){
      this.socket.close()
    }
  }
  public HandleVoteInformation(handler:Function){

    this.socket.on("Vote", (aggs_01, aggs_02) => handler(aggs_01, aggs_02))
    //this.socket.on("Vote", (aggs_01, aggs_02) => console.log(`${aggs_01} voted for -${decoder.decode(aggs_02)}-`))
  }
}
