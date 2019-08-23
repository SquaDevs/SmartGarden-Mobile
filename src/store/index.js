import { createStore } from 'redux';

const INITIAL_STATE = { plant: {} };

function Plant(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_Plant':
      return { ...state, ...action.plant };
    default:
      return state;
  }
}

const store = createStore(Plant);
export default store;

export const Creators = {
  addPlant: plant => ({
    type: 'ADD_Plant',
    plant,
  }),
};
