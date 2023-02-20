import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceRollerComponent } from './dice-roller.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiceRollerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DiceRollerModule { }
