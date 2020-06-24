/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Layout from '../../components/Layout_Basico';
import Input from '../../components/Formulario/Input';

import { ButtonStyle } from '../produtos/visualizarProdutos/styles';
import api from '../../services/api';
import UtilService from '../../services/Util/index';

export default function Compra() {
  const [autoCompleteProduto, setAutoCompleteProduto] = useState([]);
  const [produtos, setProdutos] = useState([]);

  async function handleSubmit(data, { reset }) {
    try {
      const [{ quantidadeDeCompra, dataCompra }, { nomeProduto }] = [
        data,
        { nomeProduto: autoCompleteProduto[0] },
      ];
      const response = await api.put(`compraProduto/${nomeProduto}`, {
        quantidadeDeCompra,
        dataCompra,
      });
      UtilService.retornoUtil(response);
      reset();
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }

  useEffect(() => {
    async function handleProdutos() {
      const prod = await api.get('todosProdutos');
      setProdutos(prod.data);
    }
    handleProdutos();
  }, []);

  return (
    <Layout titulo="Compra de Produtos">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
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
      </Form>
    </Layout>
  );
}
