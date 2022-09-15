import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { SocketService } from './socket-service/socket.service'
import { TreatedVote, Vote } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fillStyle:string = '#FF8BFF'
  registeredVotes:Array<TreatedVote> = [];
  dogVotes:number = 0;
  catVotes:number = 0;
  constructor(private socketService: SocketService){}

  addNewVote(vote:TreatedVote){
    this.registeredVotes.push(vote)
  }

  ngOnInit(){
    this.socketService.Connect();
    this.socketService.HandleVoteInformation((a:Vote) => {
      let decoder = new TextDecoder();
      this.addNewVote({"voter": a.voter, "vote": decoder.decode(a.vote)})
      decoder.decode(a.vote) === "dog" ? this.dogVotes += 1 : this.catVotes =+ 1;
      const dogPercentage = this.dogVotes / this.registeredVotes.length;
      const catPercentage = this.catVotes / this.registeredVotes.length;
      this.fillStyle = `linear-gradient(90deg, #89B4FA ${dogPercentage*100}%, #F58F8F ${catPercentage*100}%)`
    })
  }
  OnDestroy(){
    this.socketService.Close()
  }
  title = 'consumer-client';
}
