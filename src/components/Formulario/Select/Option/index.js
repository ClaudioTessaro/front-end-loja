/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';

export default function Option({ data }) {
  const ids = [];
  for (let i = 0; i < 100; i++) {
    ids.push(i);
  }
  return (
    <>
      {data.map(valores => (
        <option
          key={ids[valores]}
          value={valores.id !== undefined ? valores.id : valores[0]}
        >
          {valores.nome}
        </option>
      ))}
      ;
    </>
  );
}
