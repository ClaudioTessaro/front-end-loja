/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';

export default function Option({ data }) {
  return (
    <>
      {data.map(valores => (
        <option
          key={valores[0]}
          value={valores.id !== undefined ? valores.id : valores[0]}
        >
          {valores.nome}
        </option>
      ))}
      ;
    </>
  );
}
