import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { PokemonListItem, PokemonListResponse } from '../models/pokemon-list.model';
import { Pokemon, PokemonDetailResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Devuelve la lista de Pokémon ya con sus detalles completos.
  // 1) Se pide la lista (solo name/url).
  // 2) switchMap cambia hacia las peticiones de detalle.
  // 3) forkJoin espera todas las peticiones de detalle en paralelo (sin anidar subscribe).
  // 4) map transforma cada detalle crudo al modelo Pokemon que usa la UI.
  // 5) catchError atrapa cualquier fallo de la cadena y lo reenvía como error visible.
  getPokemonList(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.API_URL}?limit=${limit}&offset=${offset}`).pipe(
      switchMap((response) => {
        const detailRequests$ = response.results.map((item) => this.getPokemonDetail(item));
        return forkJoin(detailRequests$);
      }),
      catchError((error: Error) => throwError(() => new Error('No se pudo cargar la lista de Pokémon.'))),
    );
  }

  // Pide el detalle individual de un Pokémon a partir de la url recibida en la lista.
  private getPokemonDetail(item: PokemonListItem): Observable<Pokemon> {
    return this.http.get<PokemonDetailResponse>(item.url).pipe(
      map((detail) => this.mapDetailToPokemon(detail)),
    );
  }

  // Convierte la respuesta cruda de la API al modelo simplificado de la UI.
  private mapDetailToPokemon(detail: PokemonDetailResponse): Pokemon {
    return {
      id: detail.id,
      name: detail.name,
      image: detail.sprites.front_default ?? '',
      height: detail.height,
      weight: detail.weight,
      types: detail.types.map((typeSlot) => typeSlot.type.name),
      abilities: detail.abilities.map((abilitySlot) => abilitySlot.ability.name),
    };
  }
}
