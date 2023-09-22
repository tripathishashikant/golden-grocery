<template>
  <div class="app">
    <header class="app__header header">
      <TheNav />
    </header>
    <main id="mainContent" class="app_module module">
      <router-view />
    </main>
  </div>
</template>

<script>
import TheNav from "@/components/app/shared/TheNav";

export default {
  name: "HomeView",
  components: {
    TheNav,
  },
};
</script>

<style>
html {
  font-size: 62.5%;
  line-height: 1.2;
}

body {
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  background-color: purple;
}
</style>
