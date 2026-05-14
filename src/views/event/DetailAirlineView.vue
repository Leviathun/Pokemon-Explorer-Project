<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Pokemon } from '@/types'


const props = defineProps<{
    event: Pokemon
}>()
const { event } = toRefs(props)
</script>

<template>
    <div>
        <h3>Base stats</h3>
        <dl class="stats">
            <template v-for="stat in event.stats" :key="stat.stat.name">
                <dt>{{ stat.stat.name }}</dt>
                <dd>{{ stat.base_stat }}</dd>
            </template>
        </dl>
    </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: center;
  gap: 8px 24px;
  text-align: left;
}

dd {
  margin: 0;
  font-weight: 700;
}
</style>
