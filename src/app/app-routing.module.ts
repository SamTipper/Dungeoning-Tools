import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { DiceRollerComponent } from './components/dice-roller/dice-roller.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-campaign', component: CreateCampaignComponent },
  { path: 'dice-roller', component: DiceRollerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
