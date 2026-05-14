<script setup lang="ts">
import { computed } from 'vue'
import { type PokemonListItem } from '@/types'

const props = defineProps<{
  pokemon: PokemonListItem
}>()

const pokemonId = computed(() => {
  const match = props.pokemon.url.match(/\/pokemon\/(\d+)\//)

  return match ? Number(match[1]) : null
})

const imageUrl = computed(() =>
  pokemonId.value
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId.value}.png`
    : ''
)

const paddedId = computed(() => (pokemonId.value ? `#${pokemonId.value.toString().padStart(4, '0')}` : ''))
</script>

<template>
  <RouterLink class="pokemon-card" :to="{ name: 'pokemon-detail-view', params: { id: pokemon.name } }">
    <div class="pokemon-image-wrap">
      <img class="pokemon-image" :src="imageUrl" :alt="pokemon.name" loading="lazy" />
    </div>
    <div class="pokemon-card-body">
      <span class="pokemon-number">{{ paddedId }}</span>
      <h2>{{ pokemon.name }}</h2>
      <span class="card-action">View details</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.pokemon-card {
  min-height: 276px;
  overflow: hidden;
  border: 1px solid rgba(36, 49, 61, 0.12);
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
  color: #24313d;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 12px 34px rgba(36, 49, 61, 0.08);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.pokemon-card:hover {
  border-color: rgba(27, 60, 115, 0.28);
  transform: translateY(-4px);
  box-shadow: 0 18px 42px rgba(36, 49, 61, 0.14);
}

.pokemon-image-wrap {
  display: grid;
  min-height: 176px;
  place-items: center;
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 213, 79, 0.34), transparent 38%),
    linear-gradient(135deg, #e9f1ff 0%, #f4f7ef 100%);
}

.pokemon-image {
  width: min(150px, 72%);
  aspect-ratio: 1;
  object-fit: contain;
  filter: drop-shadow(0 18px 18px rgba(36, 49, 61, 0.22));
}

.pokemon-card-body {
  display: grid;
  gap: 8px;
  padding: 18px;
}

.pokemon-number {
  color: #65727e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

h2 {
  color: #24313d;
  font-size: 1.22rem;
  font-weight: 800;
  line-height: 1.15;
  text-transform: capitalize;
}

.card-action {
  color: #1b3c73;
  font-size: 0.9rem;
  font-weight: 800;
}
</style>
