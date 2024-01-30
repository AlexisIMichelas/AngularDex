
import { Component, OnInit } from '@angular/core';
import { PokemonService, Pokemon } from '../pokemon.service';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  paginatedPokemon: Pokemon[] = [];
  totalPages: number = 1;

  constructor(private pokemonService: PokemonService, private router: Router) {}


  ngOnInit(): void {

    this.pokemonService.getAllPokemonDetails().subscribe((data: Pokemon[]) => {
      console.log('Données Pokémon complètes :', data);


      if (Array.isArray(data)) {
        this.pokemonList = data;
        this.paginatePokemonList();
      } else {
        console.error('Données Pokémon non valides.');
      }
    });
  }


  paginatePokemonList(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;


    this.paginatedPokemon = this.pokemonList.slice(startIndex, endIndex);


    this.totalPages = Math.ceil(this.pokemonList.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatePokemonList();
    }
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatePokemonList();
    }
  }
  getTypeClass(types: string[] | string) {

    if (Array.isArray(types) && types.length === 2) {
      return `type-${types[0].toLowerCase()}_${types[1].toLowerCase()}`;
    }

    return `type-${
      Array.isArray(types) ? types[0].toLowerCase() : types.toLowerCase()
    }`;
  }

  goToPokemonDetails(pokemonId: number): void {
    console.log(pokemonId);
    if (pokemonId) {

      this.router.navigate(['/pokemon', pokemonId]);
    } else {
      console.error('ID du Pokémon est undefined');
    }
  }
}
