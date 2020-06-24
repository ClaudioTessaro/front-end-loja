/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
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
import UtilService from '../../../../services/Util/index';

export default function VisualizarClientes() {
  const [clientes, setClientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  async function handleSubmit(data, { reset }) {
    const response = [];
    if (data.nomeCliente === '') {
      response.push(await api.get(`clientes`));
      setClientes(response[0].data);
    } else {
      response.push(await api.get(`nomeCliente/${data.nomeCliente}`));
      setClientes(response[0].data);
    }
    reset();
  }

  async function pagination() {
    const response = await api.get(
      `clientes?page=${currentPage}&limit=${limit}`
    );
    setTotal(response.headers['x-total-count']);
    const totalPages = Math.ceil(total / limit);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
    setClientes(response.data);
  }

  useEffect(() => {
    pagination();
  }, [currentPage, limit, total]);

  async function loadRefresh() {
    const response = await api.get('clientes');
    setClientes(response.data);
  }

  async function handleDelete(id) {
    try {
      const response = await api.delete(`cliente/${id}`);
      UtilService.retornoUtil(response);
      loadRefresh();
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
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
          <caption>Quantidade</caption>

          <select
            className="form-control form-control-sm"
            style={{ width: '70px' }}
            onChange={e => setLimit(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>

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

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {currentPage > 1 && (
                <li className="page-item">
                  <a
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              )}
              {pages.map(page => (
                <li className="page-item">
                  <a
                    className="page-link"
                    isselect={page === currentPage}
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </a>
                </li>
              ))}
              {currentPage < pages.length && (
                <li className="page-item">
                  <a
                    className="page-link"
                    aria-label="Next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </Tab>
      </Form>
    </Layout>
  );
}
