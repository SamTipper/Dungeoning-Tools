import { Component } from '@angular/core';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.css']
})
export class DiceRollerComponent {
  rolling: boolean;
  diceValue: number = 0;
  modifier: number = 0;
  totalRoll: number = 0;
  currentSymbol: string = "+";
  rollHistory: number[] = [];

  /**
   * 
   * @param ms The amount of milleseconds the program should wait for
   * @returns A timeout promise equal to the time the user passed in milleseconds
   */
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async rollDice(diceMax: number){
    this.rolling = true;

    if (this.rollHistory.length === 10){
      this.rollHistory = [this.totalRoll];
    } else if (this.totalRoll !== 0 && this.modifier >= 0 || this.rollHistory.length !== 0){
      this.rollHistory.push(this.totalRoll);
    }

    const rollMax = diceMax > 20 ? 20 : diceMax;
    for (let i = 0; i < Math.floor(Math.random() * ((rollMax+1) - 3) + 3); i++){ // Roll for a random amount of times
      this.diceValue = Math.floor(Math.random() * ((diceMax+1) - 1) + 1);
      this.totalRoll = this.currentSymbol === "+" ? this.diceValue + this.modifier : this.diceValue - this.modifier;
      await this.sleep(70);
    }

    this.rolling = false;
  }

  toggleSymbol(){
    this.currentSymbol = this.currentSymbol === "+" ? "-" : "+";
  }

  updateMod(event: object){
    this.modifier = +event['target'].value;
  }
}
