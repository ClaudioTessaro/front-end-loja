/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import { Scope } from '@unform/core';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Select from '../../../components/Formulario/Select';
import Layout from '../../../components/Layout_Basico';
import Input from '../../../components/Formulario/Input';
import { ButtonStyle } from '../visualizarProdutos/styles';

import history from '../../../services/history';

import api from '../../../services/api';
import UtilService from '../../../services/Util/index';

export default function CadastrarEditarProdutos(path) {
  const formRef = useRef(null);
  const [tipoProduto, setTipoProduto] = useState([]);
  const [produto, setProduto] = useState([]);
  const [visible, setVisible] = useState([]);
  const [vendaVisible, setVendaVisible] = useState(true);
  const { id } = path.match.params;

  const { pathname } = path.location;

  useEffect(() => {
    async function loadTipoProduto() {
      const response = await api.get('/tipoProduto');
      setTipoProduto(response.data);
    }
    loadTipoProduto();
  }, []);
  useEffect(() => {
    async function loadProduto() {
      const response = await api.get(`/produto/${id}`);

      const { valorVenda, dataDaCompra, porcentagemLucro } = response.data;
      const valorDaVenda = valorVenda;
      const dataCompra = dataDaCompra.split('T')[0];
      const porcentagemDeLucro = porcentagemLucro;
      setProduto({
        ...response.data,
        dataCompra,
        valorDaVenda,
        porcentagemDeLucro,
      });
    }
    loadProduto();
  }, [id]);

  async function handleInsertSubmit(data, { reset }) {
    try {
      const response = await api.post('/produto', data);
      UtilService.retornoUtil(response);
      reset();
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }
  async function handleUpdateProduto(data) {
    try {
      const response = await api.put(`/produto/${id}`, data);
      UtilService.retornoUtil(response);
      history.push('/visualizarProdutos');
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }

  function handlVisible(e) {
    const { options, selectedIndex } = e.target;
    if (options[selectedIndex].innerHTML !== 'Oleo Vegetal') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  function handleVendaVisible() {
    setVendaVisible(!vendaVisible);
  }

  return (
    <Layout
      titulo={
        pathname === '/cadastrarProdutos'
          ? 'Cadastrar Produto'
          : 'Editar Produto'
      }
    >
      <Form
        ref={formRef}
        initialData={pathname === '/cadastrarProdutos' ? {} : produto}
        onSubmit={
          pathname === '/cadastrarProdutos'
            ? handleInsertSubmit
            : handleUpdateProduto
        }
      >
        <div className="form-row">
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="nome"
              className="form-control"
              id="inputNome"
              label="Nome do Produto"
              required
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
                name="tipoProduto"
                id="inputState"
                className="form-control"
                label="Tipo do Produto"
                data={tipoProduto}
                onChange={e => handlVisible(e)}
                required
              />
            </Scope>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="valorCompra"
              className="form-control"
              id="valorDaCompra"
              label="Valor da Compra"
              step="any"
              required
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="quantidade"
              className="form-control"
              id="inputNome"
              label="Quantidade"
              required
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Input
              type="date"
              name={
                pathname === '/cadastrarProdutos'
                  ? 'dataDaCompra'
                  : 'dataCompra'
              }
              className="form-control"
              id="dataDaCompra"
              label="Data da compra"
              required
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              disabled={!vendaVisible}
              type="number"
              min="1"
              name="porcentagemDeLucro"
              className="form-control"
              id="porcentagemDeLucro"
              label="% de Lucro"
              required={vendaVisible}
            />
          </div>

          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Input
              disabled={vendaVisible}
              type="number"
              name="valorDaVenda"
              className="form-control"
              id="valorDaVenda"
              label="Valor de venda"
              step="any"
              required={!vendaVisible}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="valorPote"
              className="form-control"
              id="valorPote"
              label="Valor do pote"
              step="any"
              disabled={visible}
              required={!visible}
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="frete"
              className="form-control"
              id="inputNome"
              label="Frete"
              step="any"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginLeft: '9px' }} />
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              name="isVenda"
              onChange={handleVendaVisible}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Quero inserir o valor da venda
            </label>
          </div>
        </div>

        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" type="reset">
            Limpar
          </Button>
          <Button className="float-right" variant="primary" type="submit">
            Enviar
          </Button>
        </ButtonStyle>
        <Link to="/visualizarProdutos">
          <Button
            style={({ height: '40px' }, { margin: '7px 0px' })}
            variant="success"
            type="button"
          >
            Voltar
          </Button>
        </Link>
      </Form>
    </Layout>
  );
}
