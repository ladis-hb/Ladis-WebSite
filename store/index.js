/* jshint esversion:8 */
export const state = () => ({
    locales: ["en", "zh"],
    locale: "en",
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
    },
    SET_LANG(state, locale) {
        state.locale = locale;
    }
};
