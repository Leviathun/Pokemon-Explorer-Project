export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonTypeSlot {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonAbilitySlot {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonStatSlot {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
  }
  types: PokemonTypeSlot[]
  abilities: PokemonAbilitySlot[]
  stats: PokemonStatSlot[]
}

export interface PokemonState {
  pokemon: Pokemon | null
}
