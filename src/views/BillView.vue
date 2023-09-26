<template>
  <div class="bill">
    <h1 class="bill__title">{{ title }}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("Bill");
</script>

<style scoped>
.bill {
  padding: 2rem 1.5;
  text-align: center;
}
</style>
