<template>
  <div class="stocks">
    <h1 class="stocks__title">{{ title }}</h1>
    <div class="stocks__search">
      <div class="stocks__searchBox">
        <input
          id="searchText"
          class="stocks__searchInput"
          type="text"
          placeholder="Search by item name to edit"
          v-model="searchQuery"
          @input="searchStock"
        />
      </div>
      <div class="stocks__add">
        <button class="stocks__addBtn" @click="addNewStock">
          Add New Stock Item
        </button>
      </div>
    </div>
    <div v-show="showStockList" class="stocks__list">
      <div
        class="stocks__listItem"
        v-for="stock in filteredStocks"
        :key="stock.id"
      >
        <div class="stocks__name">{{ stock.name || "N/A" }}</div>
        <div class="stocks__category">
          <p class="stocks__categoryTitle">{{ stock.category || "N/A" }}</p>
        </div>
        <div class="stocks__price">${{ stock.price }}</div>
        <div class="stocks__edit">
          <button @click.prevent="modifyStock(stock.id)">Modify</button>
        </div>
      </div>
      <p v-show="filteredStocks.length === 0">No results found.</p>
    </div>
    <AddStock v-if="showAddStockComponent" />
    <ModifyStock v-if="showModifyStockComponent" :item="selectedStock" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, provide } from "vue";
import { useStore } from "vuex";
import AddStock from "../components/app/stock/AddStock.vue";
import ModifyStock from "../components/app/stock/ModifyStock.vue";

const store = useStore();
const searchQuery = ref("");
const showStockList = ref(false);
const showAddStockComponent = ref(false);
const showModifyStockComponent = ref(false);

let selectedStock = reactive({
  name: null,
  category: null,
  price: null,
});

// Computed
const title = computed(() => store.getters["stockStore/getTitle"]);
const stocks = computed(() => store.getters["stockStore/getStocks"]);
const filteredStocks = computed(() => {
  if (stocks.value) {
    return stocks.value.filter((item) => {
      if (item && item.name) {
        return item.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      }
    });
  }
  return [];
});

// methods
const searchStock = () => {
  showStockList.value = true;
};
const addNewStock = () => {
  showModifyStockComponent.value = false;
  showAddStockComponent.value = true;
  store.dispatch("modalStore/openModal");
};
const modifyStock = (id) => {
  showAddStockComponent.value = false;
  showModifyStockComponent.value = true;
  const { name, category, price } = stocks.value.find((item) => item.id === id);
  selectedStock.name = name;
  selectedStock.category = category;
  selectedStock.price = price;
  store.dispatch("modalStore/openModal");
};

// life cycle hooks
onMounted(async () => {
  // provided selected stock info for modifying it.
  provide("selectedStock", selectedStock);

  if (!stocks.value) {
    await store.dispatch("stockStore/fetchStocks");
  }
});
</script>

<style scoped>
.stocks {
  padding: 2rem 1.5rem;
}

.stocks__search {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.stocks__searchBox {
  flex: 0 1 75%;
}

.stocks__searchInput {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 3rem;
  border: 1px solid rgba(0, 0, 0, 0.7);
}

.stocks__add {
  flex: 0 1 25%;
  padding-left: 1.5rem;
}

.stocks__addBtn {
  width: 100%;
  padding: 0.6rem 1rem;
  color: white;
  text-align: center;
  border: 0 none;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: blueviolet;
}
.stocks__list {
  margin-top: 2rem;
}
.stocks__listItem {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid gray;
}
.stocks__listItem:last-child {
  border-bottom: 1px solid gray;
}
.stocks__name {
  flex: 0 1 40%;
}
.stocks__category,
.stocks__price,
.stocks__edit {
  flex: 0 1 20%;
  text-align: center;
}
</style>
