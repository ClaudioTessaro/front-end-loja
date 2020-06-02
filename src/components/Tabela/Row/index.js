/* eslint-disable react/prop-types */
import React from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import api from '../../../services/api';

import { Botoes } from './styles';

export default function Row({ record, url }) {
  async function handleDelete(id) {
    await api.delete(`tipoProdutos/${id} `);
  }

  const nomeRow = Object.keys(record);
  return (
    <tr key={record[0]}>
      {nomeRow.map(key => (
        <th key={nomeRow} scope="row">
          {record[key]}
        </th>
      ))}
      <th scope="row">
        <Botoes>
          <button type="button">
            <BsPencil size={20} />
          </button>
        </Botoes>
      </th>
      <th scope="row">
        <Botoes>
          <button type="button" onCancel={() => handleDelete(1)}>
            <BsFillTrashFill size={20} />
          </button>
        </Botoes>
      </th>
    </tr>
  );
}
