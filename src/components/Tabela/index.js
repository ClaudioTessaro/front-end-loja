/* eslint-disable react/prop-types */
import React from 'react';
import Row from './Row';
import Head from './Head';

export default function Tabela({ data, titulo, head, id }) {
  return (
    <div className="table-responsive-sm">
      <table className="table">
        <caption>{titulo}</caption>
        <Head key={data.id} head={head} />
        <tbody>
          {data.map(record => (
            <Row key={record.id} record={record} id={id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
