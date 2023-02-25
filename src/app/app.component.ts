import { Component } from '@angular/core';
import { CampaignLoaderService } from './services/campaign-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rolling: boolean;
  quickDice: number = 20;
  campaignName: string;

  constructor(
    private campaign: CampaignLoaderService
  ) { 
    this.campaign.campaignNameListener.subscribe((res) => {
      this.campaignName = res;
    })
  }

  /**
   * 
   * @param ms The amount of milleseconds the program should wait for
   * @returns A timeout promise equal to the time the user passed in milleseconds
   */
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async rollDice(){
    this.rolling = true;
    for (let i = 0; i < Math.floor(Math.random() * (20 - 3) + 3); i++){ // Roll for a random amount of times
      this.quickDice = Math.floor(Math.random() * (21 - 1) + 1);
      await this.sleep(80);
    }
    this.rolling = false;
  }

  changeCampaignName(campaignName: string){
    this.campaignName = campaignName;
  }
}
