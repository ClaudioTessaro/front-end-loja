/* eslint-disable react/prop-types */
import React from 'react';

export default function Row({ record }) {
  const nomeRow = Object.keys(record);
  return (
    <tr key={record.id}>
      {nomeRow.map(key => (
        <th key={nomeRow} scope="row">
          {record[key]}
        </th>
      ))}
    </tr>
  );
}
