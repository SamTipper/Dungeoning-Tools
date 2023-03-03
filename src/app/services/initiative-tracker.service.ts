import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { Spell } from '../interfaces/spell';

@Injectable({
  providedIn: 'root'
})
export class InitiativeTrackerService {
  players: {playerObject: Player, initiativeRoll: number}[];
  customOrder: boolean;
  turn: number;
  round: number;
  activeSpells: Spell[];

  constructor() { }
}
