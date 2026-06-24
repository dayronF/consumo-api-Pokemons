import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  // Paginación simple (opcional del taller).
  private readonly limit = 20;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  // Dispara la consulta y maneja los 3 estados visuales: cargando, error y datos listos.
  loadPokemons(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage(): void {
    if (this.offset === 0) {
      return;
    }
    this.offset -= this.limit;
    this.loadPokemons();
  }
}
