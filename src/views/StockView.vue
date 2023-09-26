<template>
  <div class="stock">
    <h1 class="stock__title">{{ title }}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("Manage Stock");
</script>

<style scoped>
.stock {
  padding: 2rem 1.5;
  text-align: center;
}
</style>
