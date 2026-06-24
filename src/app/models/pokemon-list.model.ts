// Forma exacta de la respuesta del endpoint de lista.
// Solo trae "name" y "url", por eso se necesita una segunda consulta por cada item.
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
