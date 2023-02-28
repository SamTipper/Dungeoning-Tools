import { Component, OnInit } from '@angular/core';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { Player } from 'src/app/interfaces/player';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.css']
})
export class InitiativeTrackerComponent implements OnInit{
  players: {playerObject: Player, initiativeRoll: number}[] = [];
  customOrder: boolean = false;

  constructor(
    private campaign: CampaignLoaderService 
  ) { }

  ngOnInit(){
    this.campaign.players.forEach((player) => {
      this.players.push(
        {
          playerObject: player,
          initiativeRoll: player.stats.dexterity.modifier
        }
      );
      
    });
    console.log(this.players);
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

  rollInitiativeAllPlayers(){
    for (const player of this.players){
      player.initiativeRoll = Math.floor(Math.random() * (21 - 1) + 1) + player.playerObject.initiative;
    }
    this.sortByRoll();
  }
}
