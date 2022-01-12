export const state = () => ({
  buttonType: 'modern',
  selectedDevice: 'default',
})

export const mutations = {
  setButtonType(state, value) {
    state.buttonType = value
  },
  setSelectedDevice(state, value) {
    state.selectedDevice = value
  },
}

export const getters = {
  buttonTypes(state) {
    return [
      {
        label: 'Modernsno',
        value: 'modern',
      },
      {
        label: 'Vejestorio',
        value: 'classic',
      },
    ]
  },
}
