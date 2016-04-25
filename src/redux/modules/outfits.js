const LOAD = 'redux-example/outfits/LOAD';
const LOAD_SUCCESS = 'redux-example/outfits/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/outfits/LOAD_FAIL';
const CHANGE_OUTFIT = 'change_outfit';

const initialState = {
  loaded: false,
  selectedOutfit: {},
  selectedOutfitIndex: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        outfitList: action.result,
        selectedOutfit: action.result[0],
        selectedOutfitIndex: 0,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        outfitList: null,
        selectedOutfit: {},
        selectedOutfitIndex: 0,
        error: action.error
      };
    case CHANGE_OUTFIT:
      return {
        ...state,
        selectedOutfit: action.selectedOutfit,
        selectedOutfitIndex: action.selectedOutfitIndex
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.outfits && globalState.outfits.loaded;
}

// Action Creator
export function load(currentWeather, style) {
  const url = `/outfit/load/${currentWeather.temperature}/${currentWeather.datePortion}/${currentWeather.condition}/${style}`;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(url)
  };
}

export function changeOutfit(selectedOutfit, selectedOutfitIndex) {
  return {
    type: CHANGE_OUTFIT,
    selectedOutfit: selectedOutfit,
    selectedOutfitIndex: selectedOutfitIndex
  };
}
