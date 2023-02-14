import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/interfaces/player';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit{
  newCampaignForm: FormGroup;
  players: Player[] = [ <Player>{ name: "" } ]; // Adding the initial player to the array

  constructor(
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    this.newCampaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    console.log(JSON.stringify(this.players));
  }

  onAddPlayer(){
    if (this.players[this.players.length-1].name !== "" && this.players.length <= 10){
      this.players.push(
        <Player>{
          name: ""
        }
      );
    } else if (this.players.length <= 10){
      this.toastr.error('Please fill the empty player name field');
    } else {
      this.toastr.error('Max player size is 10');
    }
  }

  onRemovePlayer(index: number){
    if (this.players.length > 1){
      this.players.splice(index, 1);
    } else {
      this.players[index].name = ""; // Reset first player's name
    }
  }

  /**
   * 
   * @param event The new string that replaces the old player name.
   * @param index The index of where the edited player is in the "players" array.
   */
  onPlayerChange(event: string, index: number){
    this.players[index].name = event;
  }

  trackByFn(index: number, treatment: object){
    return index;
  }

}
