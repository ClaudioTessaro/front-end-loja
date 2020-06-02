/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Layout from '../../../components/Layout_Basico';
import Input from '../../../components/Formulario/Input';
import api from '../../../services/api';

import { ButtonStyle } from '../visualizarProdutos/styles';
import { Tabela } from './styles';

export default function CadastrarTipoProduto() {
  const [tipoProduto, setTipoProduto] = useState([]);

  useEffect(() => {
    async function loadTipo() {
      const response = await api.get('tipoProduto');
      setTipoProduto(response.data);
    }
    loadTipo();
  }, []);

  async function handleSubmit(data, { reset }) {
    try {
      await api.post('tipoProduto', data);
      toast.success('Tipo de Produto cadastrado com sucesso');
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Layout titulo="CadastrarTipoProduto">
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
      </Form>
      <Tabela>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nome do Produto</th>
              <th scope="col">Editar</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {tipoProduto.map(tipo => {
              return (
                <tr>
                  <th scope="row">{tipo.id}</th>
                  <th scope="row">{tipo.nome}</th>
                  <th scope="row">
                    <button type="button">
                      <BsPencil size={20} />
                    </button>
                  </th>
                  <th scope="row">
                    <button type="button">
                      <BsFillTrashFill size={20} />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          ;
        </table>
      </Tabela>
    </Layout>
  );
}
