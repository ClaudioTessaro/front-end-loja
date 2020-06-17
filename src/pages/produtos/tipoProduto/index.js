/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout_Basico';
import Input from '../../../components/Formulario/Input';
import api from '../../../services/api';

import * as actions from '../../../store/modules/produtos/action';

import { ButtonStyle } from '../visualizarProdutos/styles';

import { Tab } from './styles';

export default function CadastrarTipoProduto() {
  const [tipoProduto, setTipoProduto] = useState([]);
  const dispatch = useDispatch();

  async function loadTipo() {
    const response = await api.get('tipoProduto');
    setTipoProduto(response.data);
  }

  function handleUpdate(id) {
    dispatch(actions.updateProdutoRequest(id));
  }

  useEffect(() => {
    loadTipo();
  }, []);

  async function loadRefresh() {
    const response = await api.get('tipoProduto');
    setTipoProduto(response.data);
  }

  async function handleSubmit(data, { reset }) {
    try {
      await api.post('tipoProduto', data);
      toast.success('Tipo de Produto cadastrado com sucesso');
      loadRefresh();
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`tipoProduto/${id}`);
      toast.success('Tipo de Produto deletado com sucesso');
      loadRefresh();
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <Layout titulo="Cadastrar Tipo Produto">
      <Form onSubmit={handleSubmit}>
        <div className="form-group col-md-4">
          <Input
            ype="text"
            name="nome"
            className="form-control"
            id="inputNome"
            label="Nome do Produto"
          />
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
            style={({ height: '40px' }, { margin: '2px 0px' })}
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
              <caption>Lista dos tipos de Produtos</caption>
              <thead>
                <tr>
                  <th scope="col">Codigo</th>
                  <th scope="col">Tipo de Produto</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {tipoProduto.map(tipo => (
                  <tr key={tipo.id}>
                    <td>{tipo.id}</td>
                    <td>{tipo.nome}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleUpdate(tipo.id)}
                      >
                        <BsPencil size={20} />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(tipo.id)}
                      >
                        <BsFillTrashFill size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab>
      </Form>
    </Layout>
  );
}
