/* eslint-disable react/prop-types */
import React from 'react';
import Row from './Row';
import Head from './Head';

export default function Tabela({ data, titulo, head }) {
  const nomeColuna = Object.keys(data[0]);
  return (
    <>
      <table className="table">
        <caption>{titulo}</caption>
        <Head key={nomeColuna} nomeColuna={nomeColuna} head={head} />
        <tbody>
          {data.map(record => (
            <Row record={record} />
          ))}
        </tbody>
      </table>
    </>
  );
}
