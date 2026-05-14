<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="layout">
    <header class="site-header">
      <div id="flashMessage" v-if="message">
       <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'pokemon-list-view' }">Pokemon</RouterLink>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>

  <RouterView />
  </div>
</template>

<style>
#layout {
  min-height: 100vh;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #24313d;
}

.site-header {
  border-bottom: 1px solid rgba(36, 49, 61, 0.1);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.wrapper {
  max-width: 1180px;
  margin: 0 auto;
  padding: 16px 24px;
}

nav {
  display: flex;
  gap: 12px;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #4d5b66;
  border-radius: 999px;
  padding: 8px 14px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #1b3c73;
  background: #e9f1ff;
}

h2 {
  font-size: 20px
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellofade 3s ease-in-out;
  text-align: center;
}
</style>
