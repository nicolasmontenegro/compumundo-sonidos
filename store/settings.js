const defaultValues = {
  buttonType: 'modern',
  listButtonType: 'icons',
  listColumns: 1,
  selectedDevice: 'default',
  bgStyle: 'stars',
  isWide: false,
  clickRepeatSound: false,
  clickStopOtherSound: false,
  clickOutsideStop: false,
}

export const state = () => (Object.assign({}, defaultValues))

export const mutations = {
  resetValues(state) {
    Object.assign(state, defaultValues)
  },
  setButtonType(state, value) {
    state.buttonType = value
  },
  setListButtonType(state, value) {
    state.listButtonType = value
  },
  setListColumns(state, value) {
    state.listColumns = value
  },
  setSelectedDevice(state, value) {
    state.selectedDevice = value
  },
  setBgStyles(state, value) {
    state.bgStyle = value
  },
  setIsWide(state, value) {
    state.isWide = value
  },
  setClickRepeatSound(state, value) {
    state.clickRepeatSound = value
  },
  setClickStopOtherSound(state, value) {
    state.clickStopOtherSound = value
    if (!value) state.clickOutsideStop = false
  },
  setClickOutsideStop(state, value) {
    state.clickOutsideStop = value
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
  bgStyles(state) {
    return [
      {
        label: 'Vacio',
        value: 'void',
      },
      {
        label: 'Lluvia de estrellas',
        value: 'stars',
      },
      {
        label: 'Tebi.moe',
        value: 'tebi',
      },
      {
        label: 'Telo Wide',
        value: 'telowide',
      },
    ]
  },
  listButtonTypes(state) {
    return [
      {
        label: 'Íconos',
        value: 'icons',
      },
      {
        label: 'Lista',
        value: 'list',
      },
    ]
  }
}
