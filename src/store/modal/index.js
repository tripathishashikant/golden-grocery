const state = {
  open: false,
};

const getters = {
  isOpened: (state) => state.open,
  isClosed: (state) => !state.open,
};

const mutations = {
  SET_OPEN_MODAL(state) {
    state.open = true;
  },
  SET_CLOSE_MODAL(state) {
    state.open = false;
  },
};

const actions = {
  openModal({ commit }) {
    commit("SET_OPEN_MODAL");
  },
  closeModal({ commit }) {
    commit("SET_CLOSE_MODAL");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
