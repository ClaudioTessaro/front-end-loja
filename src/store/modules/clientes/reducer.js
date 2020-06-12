import produce from 'immer';

const INITIAL_STATE = {
  id: null,
};

export default function cliente(state = INITIAL_STATE, action) {
  // eslint-disable-next-line consistent-return
  return produce(state, draft => {
    switch (action.type) {
      case '@cliente/UPDATE_CLIENTE': {
        draft.id = action.id;
        break;
      }

      default:
        return state;
    }
  });
}
