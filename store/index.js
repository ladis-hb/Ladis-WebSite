/* jshint esversion:8 */
export const state = () => ({
  user: "",
  token: ""
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  }
};
