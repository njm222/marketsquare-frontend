export const state = () => ({
  isMobile: true
})

export const mutations = {
  setIsMobile (state, payload) {
    state.isMobile = payload
  }
}
