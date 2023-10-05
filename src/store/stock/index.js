import { fetchWithGet, fetchWithPost } from "@/services/axios";

const state = {
  title: "Manage Stock",
  stocks: null,
  categories: null,
};

const getters = {
  getTitle: (state) => state.title,
  getStocks: (state) => state.stocks,
  getCategories: (state) => state.categories,
};

const mutations = {
  SET_TITLE(state, newTitle) {
    state.title = newTitle;
  },
  SET_STOCKS(state, data) {
    state.stocks = data;
  },
  SET_CATEGORIES(state, data) {
    state.categories = data;
  },
};

const actions = {
  setUser({ commit }, newTitle) {
    commit("SET_TITLE", newTitle);
  },
  async fetchStocks({ commit }) {
    try {
      const response = await fetchWithGet("/stocks");
      const stocks = response.data;
      commit("SET_STOCKS", stocks);
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);
    }
  },
  async fetchCategories({ commit }) {
    try {
      const response = await fetchWithGet("/categories");
      const categroies = response.data;
      commit("SET_CATEGORIES", categroies);
    } catch (error) {
      console.error("Service Error while fetch categories details. ", error);
    }
  },
  async addStock({ dispatch }, newStock) {
    try {
      await fetchWithPost("/stocks", newStock);
      dispatch("fetchStocks");
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);
    }
  },
  async modifyStock({ dispatch }, updatedValue) {
    try {
      await fetchWithPost("/stocks", updatedValue);
      dispatch("fetchStocks");
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
