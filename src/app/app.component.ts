import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rolling: boolean;
  quickDice: number = 20;

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async rollDice(){
    this.rolling = true;
    for (let i = 0; i < Math.floor(Math.random() * (20 - 3) + 3); i++){
      this.quickDice = Math.floor(Math.random() * (21 - 1) + 1);
      await this.sleep(80);
    }
    this.rolling = false;
  }
}
