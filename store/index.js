/* jshint esversion:8 */
export const state = () => ({
  user: "nuss",
  token: "",
  carouselPics: null,
  SourceFile: []
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
  },
  setSourceFile(state, payload) {
    state.SourceFile = [
      ...state.SourceFile,
      { value: payload.path, text: payload.name, fileType: payload.fileType }
    ];
  }
};

/* export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req) {
      console.log("store-------------------------------------");
      
      if (req.headers["accept-language"].split(",")[0].includes("en")) {
        commit("SET_LANG", "en-US");
      }
    }
  }
};
 */
