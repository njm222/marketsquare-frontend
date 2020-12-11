export const state = () => ({
  isMobile: false,
})

export const mutations = {
  setIsMobile (state, payload) {
    state.isMobile = payload;
  }
}
