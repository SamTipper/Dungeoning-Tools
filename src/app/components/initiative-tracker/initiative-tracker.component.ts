import { Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { Player } from 'src/app/interfaces/player';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { InitiativeTrackerService } from 'src/app/services/initiative-tracker.service';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.css']
})
export class InitiativeTrackerComponent implements OnInit, OnDestroy{
  players: {playerObject: Player, initiativeRoll: number}[] = [];
  customOrder: boolean = false;
  turn: number;

  constructor(
    private campaign: CampaignLoaderService ,
    private initiativeService: InitiativeTrackerService
  ) { }

  ngOnInit(){
    this.customOrder = this.initiativeService.customOrder ? this.initiativeService.customOrder : undefined;
    this.turn = this.initiativeService.turn ? this.initiativeService.turn : undefined;

    if (!this.initiativeService.players){
      this.campaign.players.forEach((player) => {
        this.players.push(
          {
            playerObject: player,
            initiativeRoll: player.stats.dexterity.modifier
          }
        );
      });
      this.initiativeService.players = this.players;
    } else {
      this.players = this.initiativeService.players;
    }
  }

  ngOnDestroy(){
    this.initiativeService.customOrder = this.customOrder;
  }

  /**
   * 
   * @param ms The amount of milleseconds the program should wait for
   * @returns A timeout promise equal to the time the user passed in milleseconds
   */
  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  sortByRoll(){
    return this.players.sort((a, b) => {
      if (a.initiativeRoll === b.initiativeRoll){
        return (a.initiativeRoll - a.playerObject.initiative) < (b.initiativeRoll - b.playerObject.initiative) ? -1 : 1
      }
      return a.initiativeRoll < b.initiativeRoll ? 1 : -1
    });
  }

  async rollInitiativeAllPlayers(){
    this.customOrder = false;
    for (let i = 0; i < Math.floor(Math.random() * (21 - 1) + 1); i++){
      for (const player of this.players){
        player.initiativeRoll = Math.floor(Math.random() * (21 - 1) + 1) + player.playerObject.initiative;
      }
      this.sortByRoll();
      await this.sleep(80);
    }
  }
}
