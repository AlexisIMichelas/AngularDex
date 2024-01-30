import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';

import { Router, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;
  typesAsString: string = '';
  typeColorClass: string = '';

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];


    this.pokemonService.getPokemonDetails(id).subscribe((data: any) => {
      this.pokemon = data;

      this.typesAsString = data.types
        .map((t: { type: { name: any } }) => t.type.name)
        .join(', ');

      this.typeColorClass = this.getTypeClass(data.types);
    });
  }


  getTypeClass(types: any): string {
    if (types && types.length > 0) {
      if (types.length === 2) {

        return `type-${types[0].type.name.toLowerCase()}_${types[1].type.name.toLowerCase()}`;
      }

      return `type-${types[0].type.name.toLowerCase()}`;
    }

    return '';
  }
}


