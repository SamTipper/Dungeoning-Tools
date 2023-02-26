import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/interfaces/player';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit{
  newCampaignForm: FormGroup;
  disableForm: boolean = false;
  campaignCreated: boolean = false;
  players: Player[] = [ <Player>{ name: "", class: "Artificer", level: 1 } ]; // Adding the initial player to the array
  campaignCode: string;
  userAcknowledged: boolean = false;
  playerLevels: number[] = Array.from(Array(31).keys()).splice(1);

  constructor(
    private toastr: ToastrService,
    private http: HttpService,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(){
    this.newCampaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
    });
  }

  /**
   * 
   * @param words A string that returns with its first letter of each word capitilised
   * @returns A new string with its first letter of each word capitilised
   */
  title(words: string){
    const splitName: string[] = words.split(" ");
    let newWord: string = "";
    splitName.forEach(word => {
      newWord += `${word.charAt(0).toUpperCase() + word.substring(1)} `;
    });
    return newWord.trimEnd();
  }

  onSubmit(){
    this.disableForm = true;
    this.players.forEach((player: Player) => {
      player.name = this.title(player.name);
      player = this.playerService.setInitialStats(player);
    });

    this.http.submitCampaign(this.title(this.newCampaignForm.value.name), JSON.stringify(this.players)).subscribe(
      (res) => {
        if (res.status === 201){
          this.campaignCode = JSON.parse(res.body)['campaignCode'];
          this.campaignCreated = true;
        }
        
      }
    )
  }

  onAddPlayer(){
    if (this.players[this.players.length-1].name !== "" && this.players.length < 10){
      this.players.push(
        <Player>{
          name: "",
          class: "Artificer", 
          level: 1 
        }
      );
    } else if (this.players.length < 10){
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
  onPlayerNameChange(event: string, index: number){
    this.players[index].name = event;
  }

  onPlayerClassChange(event: string, index: number){
    this.players[index].class = event;
  }

  onPlayerLevelChange(event: string, index: number){
    this.players[index].level = +event;
  }

  trackByFn(index: number, treatment: object){
    return index;
  }

  backHome(){
    this.router.navigate(['home']);
  }

}
