import { createRouter, createWebHistory } from 'vue-router'
import ListView from '@/views/ListView.vue'
import AboutView from '@/views/AboutView.vue'

import PokemonDetailView from '@/views/pokemon/PokemonDetailView.vue'
import PokemonLayoutView from '@/views/pokemon/PokemonLayoutView.vue'
import PokemonStatsView from '@/views/pokemon/PokemonStatsView.vue'

import PageNotFoundView from '@/views/PageNotFound.vue'
import ResourceNotFound from '@/views/ResourceNotFound.vue'
import nProgress from 'nprogress'
import PokemonService from '@/services/PokemonService'
import { usePokemonStore } from '@/stores/pokemon'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemon-list-view',
      component: ListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        pageSize: parseInt(route.query.pageSize?.toString() || '24')
      })
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-layout-view',
      component: PokemonLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = to.params.id as string
        const pokemonStore = usePokemonStore()
        return PokemonService.getPokemon(id)
          .then((response) => {
            pokemonStore.setPokemon(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'pokemon' }
              }
            } else {
              return { name: 'not-found' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'pokemon-detail-view',
          component: PokemonDetailView,
          props: true
        },
        {
          path: 'stats',
          name: 'pokemon-stats-view',
          component: PokemonStatsView,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: ResourceNotFound,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: PageNotFoundView
    }
  ]
})
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
