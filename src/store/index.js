import { createStore } from "vuex";
import loginStore from "./login";

const mainState = {
  title: "Golden Grocery",
  subTitle: "Anything you want",
};

const getters = {
  getTitle: (state) => state.title,
  getSubTitle: (state) => state.subTitle,
};

const mutations = {
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_SUBTITLE(state, title) {
    state.subTitle = title;
  },
};

const actions = {
  setTitle({ commit }, title) {
    commit("SET_TITLE", title);
  },
  setSubTitle({ commit }, title) {
    commit("SET_SUBTITLE", title);
  },
};

const store = createStore({
  state: mainState,
  getters,
  mutations,
  actions,
  modules: {
    loginStore,
  },
});

export default store;
