<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Pokemon } from '@/types'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router';

const props = defineProps<{
    event: Pokemon
}>()
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore ()
const edit = () => {
    store.updateMessage('Update in progress for ' + props.event.name)
  setTimeout (() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-list-view' })
}
</script>

<template>
    <img
      v-if="event.sprites.other?.['official-artwork']?.front_default || event.sprites.front_default"
      :src="event.sprites.other?.['official-artwork']?.front_default || event.sprites.front_default || ''"
      :alt="event.name"
      class="pokemon-art"
    />
    <p>Pokédex No. {{ event.id }}</p>
    <p>Height: {{ event.height }}</p>
    <p>Weight: {{ event.weight }}</p>
    <p>Types: {{ event.types.map((slot) => slot.type.name).join(', ') }}</p>
    <p>Abilities: {{ event.abilities.map((slot) => slot.ability.name).join(', ') }}</p>
    <button @click="edit">Edit</button>
</template>

<style scoped>
.pokemon-art {
  width: min(260px, 80vw);
}
</style>
