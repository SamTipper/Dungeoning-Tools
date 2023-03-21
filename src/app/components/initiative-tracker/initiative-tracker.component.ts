import { Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { Player } from 'src/app/interfaces/player';
import { Monster } from 'src/app/interfaces/monster'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { InitiativeTrackerService } from 'src/app/services/initiative-tracker.service';
import { Spell } from 'src/app/interfaces/spell';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.css']
})
export class InitiativeTrackerComponent implements OnInit, OnDestroy{
  players: {playerObject: Player, initiativeRoll: number}[] = [];
  selectedPlayer: Player;
  activeSpells: Spell[];
  customOrder: boolean;
  disableButtons: boolean = false;
  openConditions: boolean = false;
  turn: number;
  round: number;
  math: Math = Math;

  constructor(
    private campaign: CampaignLoaderService,
    private initiativeService: InitiativeTrackerService,
    private playerService: PlayerService
  ) { }

  ngOnInit(){
    this.customOrder  = this.initiativeService.customOrder  ? this.initiativeService.customOrder          : false;
    this.turn         = this.initiativeService.turn         ? this.initiativeService.turn                 : 0;
    this.round        = this.initiativeService.round        ? this.initiativeService.round                : 1;
    this.activeSpells = this.initiativeService.activeSpells ? this.initiativeService.activeSpells         : [];

    if (!this.initiativeService.players && this.campaign.campaignCode){
      this.campaign.players.forEach((player) => {
        this.players.push(
          {
            playerObject: player,
            initiativeRoll: player.stats.dexterity.modifier
          }
        );
      });
      this.initiativeService.players = this.players;

    } else if (this.initiativeService.players) {
      this.players = this.initiativeService.players;
    }
  }

  ngOnDestroy(){
    this.initiativeService.customOrder = this.customOrder;
    this.initiativeService.activeSpells = this.activeSpells;
  }

  /**
   * 
   * @param ms The amount of milleseconds the program should wait for
   * @returns A timeout promise equal to the time the user passed in milleseconds
   */
  async sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
    console.log(this.players);
  }

  sortByRoll(){
    return this.players.sort((a, b) => {
      if (a.initiativeRoll === b.initiativeRoll){
        return (a.initiativeRoll - a.playerObject.initiative) < (b.initiativeRoll - b.playerObject.initiative) ? -1 : 1;
      }
      return a.initiativeRoll < b.initiativeRoll ? 1 : -1;
    });
  }

  sortByName(){
    const clonedPlayers = [];
    this.players.forEach(val => clonedPlayers.push(Object.assign({}, val)))
    return clonedPlayers.sort((a, b) => {
      return a.playerObject.name < b.playerObject.name ? -1 : 1;
    });
  }
  
  updateSpellOrder(){
    return this.activeSpells.sort((a, b) => {
      return a.duration > b.duration ? 1 : -1;
    });
  }

  async rollInitiativeAllPlayers(){
    this.disableButtons = true;
    this.customOrder = false;
    for (let i = 0; i < Math.floor(Math.random() * (31 - 5) + 1); i++){
      for (const player of this.players){
        player.initiativeRoll = Math.floor(Math.random() * (21 - 1) + 1) + +player.playerObject.initiative;
      }
      this.sortByRoll();
      await this.sleep(80);
    }
    this.disableButtons = false;
  }

  onCreateMonster(){
    let monster = {
      playerObject: <Monster>{
        name: "Monster",
        initiative: 0,
        monster: true,
        dead: false
      },
      initiativeRoll: 0
    }
    this.playerService.generatePlayerConditions(monster.playerObject);

    this.players.push(monster);
  }

  onAddSpell(){
    this.activeSpells.push(
      <Spell>{
        name:       '',
        casterName: '',
        duration:   1
      }
    );
  }

  onRemoveSpell(index: number){
    this.activeSpells.splice(index, 1);
  }

  onRemovePlayer(index: number){
    this.players.splice(index, 1);
  }

  incOrDecSpellDuration(increment: boolean){
    for (const spell of this.activeSpells){
      increment ? spell.duration++ : spell.duration--;
      if (spell.duration === 0){
        spell.expiredOn = this.round;
      }
    }
    this.updateSpellOrder();
  }

  changeTurn(goingUp: boolean){
    this.disableButtons = true;
    if (goingUp){
      this.turn < this.players.length - 1 ? this.turn++ : this.turn = 0;

      if (this.turn === 0){
        this.round++;
        this.incOrDecSpellDuration(false);
      }
      
    } else {

      if (this.turn !== 0){
        this.turn--;
      } else if (this.turn === 0 && this.round > 1){
        this.turn = this.players.length - 1;
        this.round--;
        this.incOrDecSpellDuration(true);
      }
    }

    this.initiativeService.turn = this.turn;
    this.initiativeService.round = this.round;
    this.disableButtons = false;
  }

  openConditionsModal(){
    this.openConditions = true;
  }

  filterExhaustion(): object{
    const allowed: string[] = [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "grappled",
      "incapacitated",
      "invisible",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "stunned",
      "unconscious"
    ];

    const filtered = Object.keys(this.selectedPlayer.conditions)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = this.selectedPlayer.conditions[key];
      return obj;
    }, {});

    return filtered;
  }

  changeSelectedPlayer(index: number){
    this.selectedPlayer = this.players[index].playerObject;
    this.openConditions = true;
  }

  currentPlayerCondtions(index: number){
    let activeCondtions: string[] = [];
    for (const [condition, value] of Object.entries(this.players[index].playerObject.conditions)){
      if (value){
        activeCondtions.push(condition);
      }
    }
    return activeCondtions;
  }

  killCreature(index: number){
    this.players[index].playerObject.dead = this.players[index].playerObject.dead ? false : true;
  }

}
