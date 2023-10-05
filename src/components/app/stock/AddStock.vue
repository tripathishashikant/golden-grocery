<template>
  <form @submit.prevent="addStock" class="addStock">
    <TheModal>
      <!-- Header slot -->
      <template #header>
        <h2>Add New Stock</h2>
      </template>

      <!-- Body slot -->
      <template #body>
        <div class="addStock__formGroup">
          <label class="addStock__formLabel addStock__nameLabel" for="name">
            Name
          </label>
          <input
            class="addStock__input addStock__nameInput"
            type="text"
            id="name"
            v-model="formData.name"
          />
          <span class="addStock__error" v-if="stockName && submitted">
            Name is required.
          </span>
        </div>

        <div class="addStock__formGroup">
          <label
            class="addStock__formLabel addStock__categoryLabel"
            for="category"
          >
            Category
          </label>
          <select
            id="category"
            class="addStock__input addStock__categoryInput"
            v-model="formData.category"
          >
            <option value="">Select</option>
            <option
              :value="category.name"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span class="addStock__error" v-if="stockCategory && submitted">
            Category is required.
          </span>
        </div>

        <div class="addStock__formGroup">
          <label class="addStock__formLabel addStock__priceLabel" for="price">
            Price
          </label>
          <input
            class="addStock__input addStock_priceInput"
            type="number"
            id="price"
            v-model="formData.price"
          />
          <span class="addStock__error" v-if="stockPrice && submitted">
            Price is required and must be a number.
          </span>
        </div>
      </template>

      <template #footer>
        <div class="addStock__submitBtnWrapper">
          <button
            class="addStock__submit"
            type="submit"
            :disabled="hasErrors"
            @click="submitted = true"
          >
            Add Stock
          </button>
        </div>
      </template>
    </TheModal>
  </form>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import TheModal from "@/components/app/shared/TheModal";

const store = useStore();
const formData = reactive({
  name: "",
  category: "",
  price: null,
});

let submitted = false;

const categories = computed(() => store.getters["stockStore/getCategories"]);
const stockName = computed(() => !formData.name);
const stockCategory = computed(() => !formData.category);
const stockPrice = computed(
  () => !formData.price || isNaN(parseFloat(formData.price))
);
const hasErrors = computed(
  () => (false && stockName.value) || stockCategory.value || stockPrice.value
);

// life cycle hooks
onMounted(async () => {
  if (!categories.value) {
    await store.dispatch("stockStore/fetchCategories");
  }
});

// methods
const addStock = () => {
  if (hasErrors.value) {
    return;
  }

  // You can dispatch an action to add the new stock to the store
  const newStock = {
    name: formData.name,
    category: formData.category,
    price: formData.price,
  };
  store.dispatch("stockStore/addStock", newStock);
  store.dispatch("modalStore/closeModal");

  // After adding the stock, you may want to reset the form
  formData.value = {
    id: "",
    name: "",
    category: "",
    price: null,
  };
};
</script>

<style scoped>
.addStock__formGroup {
  margin-bottom: 20px;
}

.addStock__formLabel {
  font-weight: bold;
}

.addStock__input {
  width: 100%;
  padding: 1rem;
  border: 1px solid;
}

.addStock__error {
  color: red;
  font-size: 14px;
}

.addStock__submitBtnWrapper {
  text-align: center;
}

.addStock__submit {
  background-color: blueviolet;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.addStock__submit:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}
</style>
