import { LogarComponent } from './logar/logar.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { TemaComponent } from './tema/tema.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'logar', component: LogarComponent },
  { path: 'cadastrar', component: CadastrarComponent},
  { path: 'home', component: HomeComponent },
  { path: 'feed', component: FeedComponent},
  { path: 'tema' , component: TemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
