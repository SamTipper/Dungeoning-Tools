import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { DiceRollerComponent } from './components/dice-roller/dice-roller.component';
import { HomeComponent } from './components/home/home.component';
import { PartyComponent } from './components/party/party.component';
import { UsefulLinksComponent } from './components/useful-links/useful-links.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-campaign', component: CreateCampaignComponent },
  { path: 'dice-roller', component: DiceRollerComponent },
  { path: 'party', component: PartyComponent },
  { path: 'useful-links', component: UsefulLinksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
