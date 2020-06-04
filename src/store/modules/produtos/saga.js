import { takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';

// eslint-disable-next-line require-yield
export function* updateTipoProduto({ id }) {
  try {
    history.push(`/editarTipoProdutos/${id}`);
  } catch (err) {
    toast.error('Erro ao atualizar tipo de produto, confira seus dados!');
  }
}

export default all([
  takeLatest('@produto/UPDATE_PRODUTO_REQUEST', updateTipoProduto),
]);
