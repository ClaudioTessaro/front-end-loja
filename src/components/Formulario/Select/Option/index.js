/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';

export default function Option({ data }) {
  return (
    <>
      <option value="-1">Selecione uma opção</option>
      {data.map(valores => (
        <option key={valores.id} value={valores.id}>
          {valores.nome}
        </option>
      ))}
      ;
    </>
  );
}
