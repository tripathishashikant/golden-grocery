<template>
  <div class="home">
    <h1 class="home__title">{{ title }}</h1>
    <h2 class="home__subTitle">{{ subTitle }}</h2>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const title = computed(() => store.getters.getTitle);
const subTitle = computed(() => store.getters.getSubTitle);
</script>

<style scoped>
.home {
  padding: 2rem 1.5;
  text-align: center;
}
.home__title {
  font-size: 3.6rem;
  font-weight: normal;
  line-height: 1;
  color: purple;
  letter-spacing: 0.2rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
.home__subTitle {
  margin-top: 5rem;

  font-size: 3.4rem;
  line-height: 1;
  color: white;
  letter-spacing: 0.3rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
</style>
