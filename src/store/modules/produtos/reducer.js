import produce from 'immer';

const INITIAL_STATE = {
  id: null,
};

export default function produto(state = INITIAL_STATE, action) {
  // eslint-disable-next-line consistent-return
  return produce(state, draft => {
    switch (action.type) {
      case '@produto/UPDATE_PRODUTO_REQUEST': {
        draft.id = action.id;
        break;
      }

      default:
        return state;
    }
  });
}
