const state = {
  user: null,
  invalidUser: false,
  redirectTo: null,
};

const getters = {
  isAuthenticated: (state) => state.user !== null,
  isInvalidUser: (state) => state.invalidUser,
  redirectTo: (state) => state.redirectTo,
  getUser: (state) => state.user,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  LOGOUT_USER(state) {
    state.user = null;
  },
  SET_INVALID_USER_ERROR(state, value) {
    state.invalidUser = value;
  },
  SET_REDIRECT_TO(state, value) {
    state.redirectTo = value;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  setInvalidUserError({ commit }, value) {
    commit("SET_INVALID_USER_ERROR", value);
  },
  setRedirectTo({ commit }, value) {
    commit("SET_REDIRECT_TO", value);
  },
  async login({ commit, dispatch }, loginData) {
    const users = await fetch(`http://localhost:3000/users`).then((r) =>
      r.json()
    );
    const currentUser = users.filter(
      (user) =>
        user.username === loginData.username &&
        user.password === loginData.password
    );

    if (currentUser.length > 0) {
      commit("SET_USER", currentUser[0]);
      const redirectTo = state.user.role === "admin" ? "/stock" : "/bill";
      dispatch("setRedirectTo", redirectTo);
    } else {
      dispatch("setInvalidUserError", true);
    }
  },
  logout({ commit }) {
    commit("LOGOUT_USER");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
