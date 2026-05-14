<script setup lang="ts">
import { computed, toRefs, defineProps } from 'vue'
import { type Pokemon } from '@/types'

const props = defineProps<{
  pokemon: Pokemon
}>()

const { pokemon } = toRefs(props)

const imageUrl = computed(
  () => pokemon.value.sprites.other?.['official-artwork']?.front_default || pokemon.value.sprites.front_default || ''
)

const types = computed(() => pokemon.value.types.map((slot) => slot.type.name))
const abilities = computed(() => pokemon.value.abilities.map((slot) => slot.ability.name))
</script>

<template>
  <section class="detail-panel">
    <div class="art-panel">
      <img v-if="imageUrl" :src="imageUrl" :alt="pokemon.name" class="pokemon-art" />
    </div>
    <div class="facts-panel">
      <dl class="facts-grid">
        <div>
          <dt>Pokedex No.</dt>
          <dd>#{{ pokemon.id.toString().padStart(4, '0') }}</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{{ pokemon.height }}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>{{ pokemon.weight }}</dd>
        </div>
        <div>
          <dt>Types</dt>
          <dd class="chips">
            <span v-for="type in types" :key="type">{{ type }}</span>
          </dd>
        </div>
        <div>
          <dt>Abilities</dt>
          <dd class="chips">
            <span v-for="ability in abilities" :key="ability">{{ ability }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.detail-panel {
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(280px, 1.1fr);
  gap: 24px;
  align-items: stretch;
  margin-top: 28px;
}

.art-panel,
.facts-panel {
  border: 1px solid rgba(36, 49, 61, 0.1);
  border-radius: 8px;
  background: #ffffff;
}

.art-panel {
  display: grid;
  min-height: 360px;
  place-items: center;
  background:
    radial-gradient(circle at 50% 44%, rgba(255, 213, 79, 0.4), transparent 36%),
    linear-gradient(135deg, #e9f1ff 0%, #f4f7ef 100%);
}

.pokemon-art {
  width: min(320px, 78%);
  aspect-ratio: 1;
  object-fit: contain;
  filter: drop-shadow(0 22px 24px rgba(36, 49, 61, 0.22));
}

.facts-panel {
  padding: 24px;
}

.facts-grid {
  display: grid;
  gap: 18px;
}

.facts-grid > div {
  border-bottom: 1px solid rgba(36, 49, 61, 0.08);
  padding-bottom: 16px;
}

.facts-grid > div:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

dt {
  margin-bottom: 8px;
  color: #65727e;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

dd {
  margin: 0;
  color: #24313d;
  font-size: 1.04rem;
  font-weight: 800;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chips span {
  border-radius: 999px;
  padding: 7px 11px;
  background: #e9f1ff;
  color: #1b3c73;
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: capitalize;
}

@media (max-width: 760px) {
  .detail-panel {
    grid-template-columns: 1fr;
  }
}
</style>
