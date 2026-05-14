import type { EventState, Pokemon } from '@/types'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: (): EventState => ({
    event: null
  }),
  actions: {
    setEvent(event: Pokemon): void {
      this.event = event
    }
  }
})
