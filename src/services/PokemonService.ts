import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

export default {
  getPokemonList(limit: number, page: number) {
    const offset = (page - 1) * limit

    return apiClient.get('/pokemon', {
      params: {
        limit,
        offset
      }
    })
  },

  getPokemon(nameOrId: string | number) {
    return apiClient.get(`/pokemon/${nameOrId}`)
  }
}
