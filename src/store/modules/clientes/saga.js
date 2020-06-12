import { takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';

// eslint-disable-next-line require-yield
export function* updateCiente({ id }) {
  try {
    history.push(`/editarCliente/${id}`);
  } catch (err) {
    toast.error('Erro ao atualizar cliente, confira seus dados!');
  }
}

export default all([takeLatest('@cliente/UPDATE_CLIENTE', updateCiente)]);
