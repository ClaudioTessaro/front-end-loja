/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Layout from '../../components/Layout_Basico';
import Input from '../../components/Formulario/Input';

import Select from '../../components/Formulario/Select';

import { ButtonStyle, Tab } from '../produtos/visualizarProdutos/styles';
import api from '../../services/api';
import UtilService from '../../services/Util/index';

export default function Venda() {
  const [clientes, setClientes] = useState([]);
  const [autoCompleteCliente, setAutoCompleteCliente] = useState([]);
  const [autoCompleteProduto, setAutoCompleteProduto] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);

  const stat = [
    { nome: 'Pendente' },
    { nome: 'Vendido' },
    { nome: 'Reservado' },
  ];

  useEffect(() => {
    async function handleCliente() {
      const cli = await api.get('clientes');
      setClientes(cli.data);
    }

    handleCliente();
  }, []);

  useEffect(() => {
    async function handleProdutos() {
      const prod = await api.get('todosProdutos');
      setProdutos(prod.data);
    }
    handleProdutos();
  }, []);

  async function handleSubmit(data, { reset }) {
    try {
      const [
        { quantidadeDeCompra, dataCompra, status },
        { nomeCliente },
        { nomeProduto },
      ] = [
        data,
        { nomeCliente: autoCompleteCliente[0] },
        { nomeProduto: autoCompleteProduto[0] },
      ];
      const response = await await api.post('venda', {
        quantidadeDeCompra,
        dataCompra,
        status,
        nomeCliente,
        nomeProduto,
      });
      UtilService.retornoUtil(response);
      const cliente = await api.get(`cliente/${nomeCliente}/${dataCompra}`);
      setListaProdutos(cliente.data);
      reset();
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }

  async function handleDelete(id) {
    try {
      const response = await api.delete(`venda/${id}`);
      UtilService.retornoUtil(response);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }

  return (
    <Layout titulo="Cadastrar Venda">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-4">
            <label>Nome do Cliente</label>
            <Typeahead
              id="input-size-example"
              labelKey="name"
              options={clientes.map(cliente => cliente.nome)}
              onChange={e => setAutoCompleteCliente(e)}
              minLength={1}
              emptyLabel="Sem resultados"
              inputProps={{ required: true }}
            />
          </div>
          <div className="form-group col-sm-1" />
          <div className="form-group col-sm-4">
            <label>Nome do Produto</label>
            <Typeahead
              id="input-size-example"
              labelKey="produtos"
              options={produtos.map(produto => produto.nome)}
              onChange={e => setAutoCompleteProduto(e)}
              minLength={1}
              emptyLabel="Sem resultados"
              inputProps={{ required: true }}
            />
          </div>
          <div className="form-group col-sm-1" />
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="quantidadeDeCompra"
              className="form-control"
              id="inputMarca"
              label="Quantidade de Compra"
              required
            />
          </div>
          <div className="form-group col-sm-1" />
        </div>
        <div className="form-row">
          <div className="form-group col-sm-2">
            <Input
              type="date"
              name="dataCompra"
              className="form-control"
              id="dataDaCompra"
              label="Data da compra"
              required
            />
          </div>
          <div className="form-group col-sm-2">
            <Select
              name="status"
              id="inputState"
              className="form-control"
              label="Status da compra"
              data={stat}
            />
          </div>
        </div>
        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" size="lg" type="reset">
            Limpar
          </Button>
          <Button
            className="float-right"
            variant="primary"
            size="lg"
            type="submit"
          >
            Enviar
          </Button>
        </ButtonStyle>
        <Link to="/visualizarVendas">
          <Button
            style={({ height: '40px' }, { margin: '7px 0px' })}
            variant="success"
            size="lg"
            type="button"
          >
            Voltar
          </Button>
        </Link>
        <Tab>
          <div className="table-responsive">
            <table className="table">
              <caption>Lista dos Produtos Comprados</caption>
              <thead>
                <tr>
                  <th scope="col">Nome do cliente</th>
                  <th scope="col">Nome do Produto</th>
                  <th scope="col">Quantidade do Produto Comprado</th>
                  <th scope="col">Data da compra</th>
                  <th scope="col">Valor de Venda</th>
                  <th scope="col">Status</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
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
                    <td>
                      <button type="button">
                        <BsPencil size={20} />
                      </button>
                    </td>
                    <td>
                      <button type="button">
                        <BsFillTrashFill
                          size={20}
                          onClick={() => handleDelete(item.id)}
                        />
                      </button>
                    </td>
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
