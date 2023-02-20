import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @param name The name of the campaign.
   * @param players JSON stringified version of the players array.
   * @returns A subscription.
   */
  submitCampaign(name: string, players: string){
    return this.http.post(
      "http://localhost:15212/set_campaign",
      {
        observe: "response",
        responseType: "text"
      }
    )
  }
}
