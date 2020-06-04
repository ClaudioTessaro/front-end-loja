/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Select from '../../../components/Formulario/Select';
import Layout from '../../../components/Layout_Basico';
import Input from '../../../components/Formulario/Input';
import { ButtonStyle } from '../visualizarProdutos/styles';

import api from '../../../services/api';

export default function CadastrarEditarProdutos() {
  const [tipoProduto, setTipoProduto] = useState([]);

  useEffect(() => {
    async function loadTipoProduto() {
      const response = await api.get('/tipoProduto');
      setTipoProduto(response.data);
    }
    loadTipoProduto();
  }, []);

  function handleSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <Layout titulo="Cadastrar Produtos">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="nome"
              className="form-control"
              id="inputNome"
              label="Nome do Produto"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="marcaProduto"
              className="form-control"
              id="inputMarca"
              label="Marca do Produto"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Scope path="tipoProduto">
              <Select
                name="idTipoProduto"
                id="inputState"
                className="form-control"
                label="Tipo do Produto"
                data={tipoProduto}
              />
            </Scope>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="text"
              name="valorDaCompra"
              className="form-control"
              id="valorDaCompra"
              label="Valor do Produto"
              placeholder="15,50"
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="quantidadeCompra"
              className="form-control"
              id="inputNome"
              label="Quantidade"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Input
              type="date"
              name="dataDaCompra"
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
          <Button
            className="float-right"
            variant="primary"
            size="lg"
            type="submit"
          >
            Enviar
          </Button>
        </ButtonStyle>
        <Link to="/visualizarProdutos">
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
