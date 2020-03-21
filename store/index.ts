 import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { selectFiles } from '../server/typing/interface'
export const state = () => ({
  SourceFile:[{path: "/upload/1572055868193banner01-pc.jpg", name: "1572055868193banner01-pc.jpg", filetype: "img"}] as selectFiles[],
  name:"ladis"
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // name: state => state.name,
}

export const mutations: MutationTree<RootState> = {
  SET_SOURCE_FILE: (state, payload: selectFiles) => {
    state.SourceFile.push(payload as never)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  
}

/* export const state = () => ({
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
    const forwardedHost = req.headers["x-forwarded-host"]
    const host = req.headers.host.split(":")[0]
    // console.log({forwardedHost,host});
    
    if (req) {
      let localUrl = forwardedHost || host
      let localSite = true;
      switch(localUrl){
        case "localhost":
        case "116.62.48.175":
        case "www.ladis.com.cn":
          localSite = true;
        break;
        default:
          localUrl = "localhost"
          localSite = true;
        break;
      }
      commit("setHost",{localUrl,localSite});      
    }
  }
}; */
 
