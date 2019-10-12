/* jshint esversion:8 */
export const state = () => ({
  user: "nuss",
  token: "",
  carouselPics: null
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  carouselPic(state, payload) {
    state.carouselPics = payload;
  }
};
