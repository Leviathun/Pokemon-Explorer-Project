<template>
  <main class="pokemon-page">
    <section class="hero">
      <div>
        <p class="eyebrow">PokeAPI explorer</p>
        <h1>About Pokemon Explorer</h1>
        <p class="intro">
          Pokemon Explorer is a web application that allows you to browse the national Pokemon catalog, open each profile, and inspect abilities, types, and base stats.
        </p>
      </div>
    </section>
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
</style>
