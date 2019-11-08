/* jshint esversion:8 */
export const state = () => ({
  user: "nuss",
  token: "",
  carouselPics: null,
  SourceFile: [],
  localUrl:"",
  localSite:true,
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
  },
  setHost(state,payload){
    state.localUrl = payload.localUrl;
    state.localSite = payload.localSite;
  }
};

 export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req) {
      let localUrl = req.headers.host
      let localSite = true;
      switch(localUrl){
        case "localhost":
        case "www.ladis.com.cn":
          localSite = true;
        break;
        default:
          localSite = false;
        break
      }
      commit("setHost",{localUrl,localSite});      
    }
  }
};
 
