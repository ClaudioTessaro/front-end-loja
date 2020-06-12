import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Layout from '../../../components/Layout_Basico';
import Input from '../../../components/Formulario/Input';
import { ButtonStyle } from '../../produtos/visualizarProdutos/styles';
import api from '../../../services/api';
import history from '../../../services/history';

export default function Cliente(path) {
  const [cliente, setCliente] = useState([]);
  const { id } = path.match.params;
  const { pathname } = path.location;

  useEffect(() => {
    async function initialValue() {
      const response = await api.get(`cliente/${id}`);
      setCliente(response.data);
    }
    initialValue();
  }, [id]);

  async function handleInsertSubmit(data, { reset }) {
    await api.post('/cliente', data);
    reset();
  }

  async function handleUpdateCliente(data) {
    await api.put(`/cliente/${id}`, data);
    history.push('/visualizarClientes');
  }

  return (
    <Layout
      titulo={pathname === '/cliente' ? 'Cadastrar Cliente' : 'Editar Cliente'}
    >
      <Form
        initialData={pathname === '/cliente' ? {} : cliente}
        onSubmit={
          pathname === '/cliente' ? handleInsertSubmit : handleUpdateCliente
        }
      >
        <div className="form-row">
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="nome"
              className="form-control"
              id="inputNome"
              label="Nome do Cliente"
              required
            />
          </div>
          <div className="form-group col-md-2" />
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="telefone"
              className="form-control"
              id="inputMarca"
              label="Telefone"
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
        <Link to="/visualizarClientes">
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
