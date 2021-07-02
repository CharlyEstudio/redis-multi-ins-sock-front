import {Component, HostListener} from '@angular/core';
import {SocketService} from './services/socket/socket.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formMessage: FormGroup;
  messages: string[] = [];

  constructor(
    private readonly socketService: SocketService,
  ) {
    this.formMessage = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    this.socketService.escucharDeServidor('notificationOfServer').subscribe((resp) => {
      this.messages.push(resp.toString());
      /*const chatBox = document.querySelector('#chatBox');
      console.log(chatBox.scrollTop);
      console.log(chatBox.scrollHeight);
      chatBox.scrollTop = chatBox.clientHeight;*/
    });
  }

  send() {
    if (this.formMessage.status === 'INVALID') {
      return;
    }

    this.socketService.accionAServidor('message', this.formMessage.controls.message.value);
  }

}
