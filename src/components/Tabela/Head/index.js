/* eslint-disable react/prop-types */
import React from 'react';

export default function Head({ nomeColuna, head }) {
  const tableHead = head || {};
  return (
    <thead>
      <tr key={head[0]}>
        {nomeColuna.map(key => (
          <th key={key} scope="col">
            {tableHead[key] || key}
          </th>
        ))}
      </tr>
    </thead>
  );
}
