import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}


interface PokemonListResponse {
  results: { url: string }[];
}


interface PokemonDetails {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}


@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2';


  constructor(private http: HttpClient) {}


  getPokemonList(
    limit: number = 100,
    offset: number = 0
  ): Observable<PokemonListResponse> {

    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`
    );
  }


  getAllPokemonDetails(): Observable<Pokemon[]> {
    return this.getPokemonList().pipe(
      switchMap((pokemonListData) => {

        const results = pokemonListData.results.map((pokemon) => {

          const pokemonId = this.getPokemonIdFromUrl(pokemon.url);

          return this.getPokemonDetails(pokemonId).pipe(
            map((details) => ({

              id: pokemonId,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((type) => type.type.name),
            }))
          );
        });
        return forkJoin(results);
      })
    );
  }

  public getPokemonDetails(id: number): Observable<PokemonDetails> {

    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${id}`);
  }


  private getPokemonIdFromUrl(url: string): number {

    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
