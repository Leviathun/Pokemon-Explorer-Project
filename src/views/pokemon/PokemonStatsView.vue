<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Pokemon } from '@/types'

const props = defineProps<{
  pokemon: Pokemon
}>()

const { pokemon } = toRefs(props)
</script>

<template>
  <section class="stats-panel">
    <h2>Base stats</h2>
    <dl class="stats">
      <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-row">
        <dt>{{ stat.stat.name }}</dt>
        <dd>
          <span>{{ stat.base_stat }}</span>
          <meter min="0" max="180" :value="stat.base_stat">{{ stat.base_stat }}</meter>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.stats-panel {
  margin-top: 28px;
  border: 1px solid rgba(36, 49, 61, 0.1);
  border-radius: 8px;
  padding: 24px;
  background: #ffffff;
}

h2 {
  margin-bottom: 20px;
  color: #24313d;
  font-size: 1.4rem;
  font-weight: 900;
}

.stats {
  display: grid;
  gap: 16px;
}

.stat-row {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
}

dt {
  color: #596875;
  font-weight: 900;
  text-transform: capitalize;
}

dd {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  margin: 0;
}

dd span {
  color: #24313d;
  font-weight: 700;
}

meter {
  width: 100%;
  height: 12px;
}

@media (max-width: 560px) {
  .stat-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
