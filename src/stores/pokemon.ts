import type { Pokemon, PokemonState } from '@/types'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemon: null
  }),
  actions: {
    setPokemon(pokemon: Pokemon): void {
      this.pokemon = pokemon
    }
  }
})
