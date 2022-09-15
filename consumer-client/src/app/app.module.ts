import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketService } from './socket-service/socket.service'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ SocketService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
