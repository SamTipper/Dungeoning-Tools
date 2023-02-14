import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit{
  newCampaignForm: FormGroup;
  players: string[] = [null];

  ngOnInit(){
    this.newCampaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){

  }

  onAddPlayer(){
    this.players.push(null);
  }

  onPlayerChange(event, index){
    this.players[index] = event;
    console.log(JSON.stringify(this.players));
  }

  trackByFn(index, treatment) {
    return index;
  }

}
