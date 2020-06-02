/* eslint-disable react/prop-types */
import React from 'react';

export default function Head({ head }) {
  const tableHead = Object.values(head);
  return (
    <thead>
      <tr key={head[0]}>
        {tableHead.map(key => (
          <th key={key[0]} scope="col">
            {tableHead[key] || key}
          </th>
        ))}
      </tr>
    </thead>
  );
}
