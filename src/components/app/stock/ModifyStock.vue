<template>
  <form @submit.prevent="modifyStock" class="modifyStock">
    <TheModal>
      <!-- Header slot -->
      <template #header>
        <h2>Modify Stock</h2>
      </template>

      <!-- Body slot -->
      <template #body>
        <div class="modifyStock__formGroup">
          <label
            class="modifyStock__formLabel modifyStock__nameLabel"
            for="name"
          >
            Name
          </label>
          <input
            class="modifyStock__input modifyStock__nameInput"
            type="text"
            id="name"
            v-model="selectedStock.name"
          />
          <span class="modifyStock__error" v-if="stockName && submitted">
            Name is required.
          </span>
        </div>

        <div class="modifyStock__formGroup">
          <label
            class="modifyStock__formLabel modifyStock__categoryLabel"
            for="category"
          >
            Category
          </label>
          <input
            class="modifyStock__input modifyStock__categoryInput"
            type="text"
            id="category"
            v-model="selectedStock.category"
          />
          <span class="modifyStock__error" v-if="stockCategory && submitted">
            Category is required.
          </span>
        </div>

        <div class="modifyStock__formGroup">
          <label
            class="modifyStock__formLabel modifyStock__priceLabel"
            for="price"
          >
            Price
          </label>
          <input
            class="modifyStock__input modifyStock_priceInput"
            type="number"
            id="price"
            v-model="selectedStock.price"
          />
          <span class="modifyStock__error" v-if="stockPrice && submitted">
            Price is required and must be a number.
          </span>
        </div>
      </template>

      <template #footer>
        <div class="modifyStock__submitBtnWrapper">
          <button
            class="modifyStock__submit"
            type="submit"
            :disabled="hasErrors"
            @click="submitted = true"
          >
            Modify Stock
          </button>
        </div>
      </template>
    </TheModal>
  </form>
</template>

<script setup>
import { inject, computed } from "vue";
import { useStore } from "vuex";
import TheModal from "@/components/app/shared/TheModal";

const store = useStore();
let selectedStock = inject("selectedStock");

let submitted = false;

const stockName = computed(() => !selectedStock.name);
const stockCategory = computed(() => !selectedStock.category);
const stockPrice = computed(
  () => !selectedStock.price || isNaN(parseFloat(selectedStock.price))
);
const hasErrors = computed(() => {
  return stockName.value || stockCategory.value || stockPrice.value;
});

const modifyStock = () => {
  if (hasErrors.value) {
    return;
  }

  // You can dispatch an action to add the new stock to the store
  const updatedStock = {
    name: selectedStock.name,
    category: selectedStock.category,
    price: selectedStock.price,
  };
  store.dispatch("stockStore/modifyStock", updatedStock);
  store.dispatch("modalStore/closeModal");

  // After adding the selectedStock, you may want to reset the form
  selectedStock = {
    name: "",
    category: "",
    price: 0,
  };
};
</script>

<style scoped>
.modifyStock__formGroup {
  margin-bottom: 20px;
}

.modifyStock__formLabel {
  font-weight: bold;
}

.modifyStock__input {
  width: 100%;
  padding: 1rem;
  border: 1px solid;
}

.modifyStock__error {
  color: red;
  font-size: 14px;
}

.modifyStock__submitBtnWrapper {
  text-align: center;
}

.modifyStock__submit {
  background-color: blueviolet;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.modifyStock__submit:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}
</style>
