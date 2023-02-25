import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private constants: ConstantsService
  ) { }

  /**
   * 
   * @param campaignCode The unqiue identifier that tells the server what campaign data to return
   * @returns A subscription.
   */
  getCampaign(campaignCode: string){
    return this.http.get(
      `${this.constants.API}/get_campaign`,
      {
        headers: {campaignCode: campaignCode},
        observe: "response",
        responseType: "text"
      }
    )
  }

  /**
   * @param name The name of the campaign.
   * @param players JSON stringified version of the players array.
   * @returns A subscription.
   */
  submitCampaign(name: string, players: string){
    return this.http.post(
      `${this.constants.API}/set_campaign`,
      {
        campaignName: name,
        players: players
      },
      {
        headers: {},
        observe: "response",
        responseType: "text"
      }
    )
  }

  updateCampaign(campaignCode: string, name: string, players: string){
    return this.http.post(
      `${this.constants.API}/update_campaign`,
      {
        campaignCode: campaignCode,
        campaignName: name,
        players: players
      },
      {
        headers: {},
        observe: "response",
        responseType: "text"
      }
    )
  }
}
