// Sub-tipos de la respuesta de detalle de la PokéAPI.
// Solo se tipan los campos que realmente se usan.
export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
}

// Respuesta cruda del endpoint GET /pokemon/:id_o_nombre
export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
  stats: PokemonStat[];
}

// Modelo simplificado que consume el componente.
// Se obtiene mapeando PokemonDetailResponse con el operador map.
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
}
