<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'

const store = usePokemonStore()
const { pokemon } = storeToRefs(store)
</script>

<template>
  <main v-if="pokemon" class="pokemon-profile">
    <RouterLink class="back-link" :to="{ name: 'pokemon-list-view' }">Back to explorer</RouterLink>
    <header class="profile-header">
      <div>
        <p class="pokemon-number">#{{ pokemon.id.toString().padStart(4, '0') }}</p>
        <h1>{{ pokemon.name }}</h1>
      </div>
      <nav>
        <RouterLink :to="{ name: 'pokemon-detail-view', params: { id: pokemon.name } }">Details</RouterLink>
        <RouterLink :to="{ name: 'pokemon-stats-view', params: { id: pokemon.name } }">Stats</RouterLink>
      </nav>
    </header>
    <RouterView :pokemon="pokemon" />
  </main>
</template>

<style scoped>
.pokemon-profile {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 56px;
}

.back-link {
  display: inline-flex;
  margin-bottom: 22px;
  color: #1b3c73;
  font-weight: 900;
  text-decoration: none;
}

.profile-header {
  display: flex;
  gap: 18px;
  align-items: end;
  justify-content: space-between;
  border-bottom: 1px solid rgba(36, 49, 61, 0.1);
  padding-bottom: 18px;
}

.pokemon-number {
  color: #d14d34;
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0.12em;
}

h1 {
  color: #24313d;
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1;
  text-transform: capitalize;
}

nav {
  display: flex;
  gap: 10px;
}

nav a {
  border-radius: 8px;
  padding: 9px 14px;
  color: #4d5b66;
  font-weight: 900;
  text-decoration: none;
}

nav a.router-link-exact-active {
  background: #e9f1ff;
  color: #1b3c73;
}

@media (max-width: 640px) {
  .profile-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
