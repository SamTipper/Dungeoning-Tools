import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit{
  newCampaignForm: FormGroup;
  players: Player[] = [ <Player>{} ]; // Adding the initial player to the array

  ngOnInit(){
    this.newCampaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){

  }

  onAddPlayer(){
    this.players.push(
      <Player>{
        name: ""
      }
    );
  }

  onPlayerChange(event: string, index: number){
    this.players[index].name = event;
    console.log(JSON.stringify(this.players));
  }

  trackByFn(index: number, treatment) {
    return index;
  }

}
