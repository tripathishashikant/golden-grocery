<template>
  <div class="homeView">
    <TheHome />
  </div>
</template>

<script>
import TheHome from "../components/app/shared/TheHome.vue";

export default {
  name: "HomeView",
  components: {
    TheHome,
  },
};
</script>

<style>
.homeView {
  padding: 1rem 1.5rem;
}
</style>
