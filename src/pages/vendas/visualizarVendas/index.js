/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { format, parseISO } from 'date-fns';
import Button from 'react-bootstrap/Button';
import Input from '../../../components/Formulario/Input';
import Layout from '../../../components/Layout_Basico';
import { ButtonStyle, Tab } from '../../produtos/visualizarProdutos/styles';

import api from '../../../services/api';

export default function VisualizarVendas() {
  const [clientes, setClientes] = useState([]);
  const [autoCompleteCliente, setAutoCompleteCliente] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);

  useEffect(() => {
    async function handleCliente() {
      const cli = await api.get('clientes');
      setClientes(cli.data);
    }

    handleCliente();
  }, []);

  async function handleSubmit(data, { reset }) {
    const [{ dataCompra }, { nomeCliente }] = [
      data,
      { nomeCliente: autoCompleteCliente[0] },
    ];

    const vendas = await api.get(`cliente/${nomeCliente}/${dataCompra}`);
    setListaProdutos(vendas.data);

    reset();
  }

  return (
    <Layout titulo="Consultar vendas por cliente">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-4">
            <label htmlFor="nome">Nome do Cliente</label>
            <Typeahead
              id="input-size-example"
              labelKey="name"
              options={clientes.map(cliente => cliente.nome)}
              onChange={e => setAutoCompleteCliente(e)}
              minLength={1}
              emptyLabel="Sem resultados"
            />
          </div>
          <div className="form-group col-sm-3" />
          <div className="form-group col-sm-3">
            <Input
              type="date"
              name="dataCompra"
              className="form-control"
              id="dataDaCompra"
              label="Data da compra"
            />
          </div>
        </div>
        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" size="lg" type="reset">
            Limpar
          </Button>
          <Link to="/venda">
            <Button variant="success" size="lg" type="button">
              Nova Venda
            </Button>
          </Link>
          <Button variant="primary" size="lg" type="submit">
            Pesquisar
          </Button>
        </ButtonStyle>
        <Tab>
          <div className="table-responsive">
            <table className="table">
              <caption>Lista dos Produtos Comprados</caption>
              <thead className="justify-center">
                <tr>
                  <th scope="col">Nome do cliente</th>
                  <th scope="col">Nome do Produto</th>
                  <th scope="col">Quantidade do Produto Comprado</th>
                  <th scope="col">Data da compra</th>
                  <th scope="col">Valor de Venda</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {listaProdutos.map(item => (
                  <tr key={item.id}>
                    <td>{item.cliente.nome}</td>
                    <td>{item.produto.nome}</td>
                    <td>{item.quantidadeDeCompra}</td>
                    <td>{format(parseISO(item.dataDaCompra), 'dd/MM/yyyy')}</td>
                    <td>{item.valorVenda}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
                {listaProdutos.length === 0 ? '' : <td colSpan={4}>Total</td>}
                {listaProdutos.length === 0 ? (
                  ''
                ) : (
                  <td>
                    {listaProdutos
                      .reduce((total, item) => total + item.valorVenda, 0)
                      .toFixed(2)}
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </Tab>
      </Form>
    </Layout>
  );
}
