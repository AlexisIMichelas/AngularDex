import { Routes } from '@angular/router';


import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-details/pokemon-details.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [

  { path: '', component: PokemonListComponent },


  { path: 'pokemon/:id', component: PokemonDetailComponent, pathMatch: 'full' },
];

