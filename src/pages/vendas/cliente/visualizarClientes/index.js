/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Input from '../../../../components/Formulario/Input';
import Layout from '../../../../components/Layout_Basico';
import { ButtonStyle, Tab } from '../../../produtos/visualizarProdutos/styles';
import * as actions from '../../../../store/modules/clientes/action';

import api from '../../../../services/api';

export default function VisualizarClientes() {
  const [clientes, setClientes] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  async function handleSubmit(data, { reset }) {
    const response = [];

    if (data.nomeCliente === '') {
      response.push(await api.get('clientes'));
      setClientes(response[0].data);
    } else {
      response.push(await api.get(`nomeCliente/${data.nomeCliente}`));
      setClientes(response[0].data);
    }
    reset();
  }

  async function handleDelete(id) {
    try {
      await api.delete(`cliente/${id}`);
      toast.success('Cliente deletado com sucesso');
    } catch (err) {
      toast.error(err.message);
    }
  }

  function handleInsert() {
    history.push('/cliente');
  }

  function handleUpdate(id) {
    dispatch(actions.updateCliente(id));
  }

  return (
    <Layout titulo="Consultar Clientes">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-5">
            <Input
              type="text"
              name="nomeCliente"
              className="form-control"
              id="dataDaCompra"
              label="Nome do Cliente"
            />
          </div>
          <div className="form-group col-sm-3" />
        </div>
        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" size="lg" type="reset">
            Limpar
          </Button>

          <Button
            variant="success"
            size="lg"
            type="button"
            onClick={handleInsert}
          >
            Nova Cliente
          </Button>

          <Button variant="primary" size="lg" type="submit">
            Pesquisar
          </Button>
        </ButtonStyle>
        <Tab>
          <div className="table-responsive">
            <table className="table">
              <caption>Lista dos Clientes</caption>
              <thead className="justify-center">
                <tr>
                  <th scope="col">Nome do cliente</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(item => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.telefone}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleUpdate(item.id)}
                      >
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
              </tbody>
            </table>
          </div>
        </Tab>
      </Form>
    </Layout>
  );
}
