<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import { type PokemonListItem, type PokemonListResponse } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import PokemonService from '@/services/PokemonService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pokemon = ref<PokemonListItem[] | null>(null)
const totalPokemon = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

const pageSize = ref(props.pageSize)
const page = computed(() => props.page)

onMounted(() => {
  watchEffect(() => {
    pokemon.value = null
    PokemonService.getPokemonList(pageSize.value, page.value)
      .then((response) => {
        const data = response.data as PokemonListResponse

        if (!data.results.length) {
          router.push({ name: 'not-found' })
          return
        }

        pokemon.value = data.results
        totalPokemon.value = data.count
      })
      .catch((error) => {
        console.error('There was an error!', error)
        router.push({ name: 'not-found' })
      })
  })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPokemon.value / pageSize.value)
  return page.value < totalPages
})

const showingStart = computed(() => (totalPokemon.value ? (page.value - 1) * pageSize.value + 1 : 0))
const showingEnd = computed(() => Math.min(page.value * pageSize.value, totalPokemon.value))

const updatePageSize = (size: number) => {
  pageSize.value = size
  router.push({ query: { ...route.query, pageSize: size, page: 1 } })
}
</script>

<template>
  <main class="pokemon-page">
    <section class="hero">
      <div>
        <p class="eyebrow">PokeAPI explorer</p>
        <h1>Pokemon Explorer</h1>
        <p class="intro">
          Browse the national Pokemon catalog, open each profile, and inspect abilities, types, and base stats.
        </p>
      </div>
      <div class="hero-meter" aria-label="Pokemon catalog size">
        <strong>{{ totalPokemon || '...' }}</strong>
        <span>known Pokemon</span>
      </div>
    </section>

    <section class="toolbar" aria-label="Pokemon list controls">
      <p class="results-summary">Showing {{ showingStart }}-{{ showingEnd }} of {{ totalPokemon }}</p>
      <label for="page-size">
        Cards per page
        <select id="page-size" v-model="pageSize" @change="updatePageSize(pageSize)">
          <option :value="12">12</option>
          <option :value="24">24</option>
          <option :value="48">48</option>
        </select>
      </label>
    </section>

    <div class="pokemon-grid" aria-live="polite">
      <template v-if="pokemon">
        <PokemonCard v-for="entry in pokemon" :key="entry.name" :pokemon="entry" />
      </template>
      <div v-else class="loading-grid">
        <div v-for="index in pageSize" :key="index" class="loading-card" />
      </div>
    </div>

    <div class="pagination">
      <RouterLink
        v-if="page !== 1"
        class="page-link"
        :to="{ name: 'pokemon-list-view', query: { page: page - 1, pageSize } }"
        rel="prev"
      >
        Prev
      </RouterLink>
      <span v-else class="page-link disabled">Prev</span>

      <span class="page-count">Page {{ page }}</span>

      <RouterLink
        v-if="hasNextPage"
        class="page-link"
        :to="{ name: 'pokemon-list-view', query: { page: page + 1, pageSize } }"
        rel="next"
      >
        Next
      </RouterLink>
      <span v-else class="page-link disabled">Next</span>
    </div>
  </main>
</template>

<style scoped>
.pokemon-page {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 40px 0 56px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  padding: 28px 0 30px;
}

.eyebrow {
  margin-bottom: 8px;
  color: #d14d34;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  color: #24313d;
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  font-weight: 900;
  line-height: 0.96;
}

.intro {
  max-width: 620px;
  margin-top: 18px;
  color: #596875;
  font-size: 1.05rem;
}

.hero-meter {
  display: grid;
  min-width: 178px;
  border: 1px solid rgba(36, 49, 61, 0.1);
  border-radius: 8px;
  padding: 18px;
  background: #fff7d6;
}

.hero-meter strong {
  color: #1b3c73;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
}

.hero-meter span {
  color: #596875;
  font-size: 0.92rem;
  font-weight: 700;
}

.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  border-top: 1px solid rgba(36, 49, 61, 0.1);
  border-bottom: 1px solid rgba(36, 49, 61, 0.1);
  padding: 14px 0;
}

.results-summary {
  color: #596875;
  font-weight: 700;
}

label {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #596875;
  font-size: 0.92rem;
  font-weight: 800;
}

select {
  min-width: 80px;
  border: 1px solid rgba(36, 49, 61, 0.18);
  border-radius: 8px;
  padding: 8px 12px;
  background: #ffffff;
  color: #24313d;
  font: inherit;
  font-weight: 800;
}

.pokemon-grid,
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 18px;
}

.loading-card {
  min-height: 276px;
  border-radius: 8px;
  background: linear-gradient(100deg, #eef2f5 0%, #ffffff 45%, #eef2f5 100%);
  background-size: 220% 100%;
  animation: shimmer 1.4s linear infinite;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 30px;
}

.page-link {
  min-width: 88px;
  border: 1px solid rgba(36, 49, 61, 0.14);
  border-radius: 8px;
  padding: 10px 16px;
  background: #ffffff;
  color: #1b3c73;
  font-weight: 900;
  text-decoration: none;
}

.page-link.disabled {
  color: #9ba6af;
  cursor: not-allowed;
}

.page-count {
  color: #596875;
  font-weight: 800;
}

@keyframes shimmer {
  to {
    background-position: -220% 0;
  }
}

@media (max-width: 720px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-meter {
    min-width: 0;
  }

  .toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .pokemon-grid,
  .loading-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
