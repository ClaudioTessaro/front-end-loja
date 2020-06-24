/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout_Basico';

import api from '../../../services/api';
import UtilService from '../../../services/Util/index';

import * as actions from '../../../store/modules/produtos/action';

import { ButtonStyle } from '../visualizarProdutos/styles';

import { Tab } from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
});
export default function CadastrarTipoProduto() {
  const [tipoProduto, setTipoProduto] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  async function loadTipo() {
    const response = await api.get(
      `tipoProduto?page=${currentPage}&limit=${limit}`
    );
    setTotal(response.headers['x-total-count']);
    const totalPages = Math.ceil(total / limit);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
    setTipoProduto(response.data);
  }

  function handleUpdate(id) {
    dispatch(actions.updateProdutoRequest(id));
  }

  useEffect(() => {
    loadTipo();
  }, [currentPage, limit, total]);

  async function handleSubmit(data, { reset }) {
    try {
      const response = await api.post('tipoProduto', data);
      UtilService.retornoUtil(response);
      loadTipo();
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
      } else if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }

  async function handleDelete(id) {
    try {
      const response = await api.delete(`tipoProduto/${id}`);
      UtilService.retornoUtil(response);
      loadTipo();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  return (
    <Layout titulo="Cadastrar Tipo Produto">
      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="form-group col-md-4">
          <Input
            type="text"
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
      </Form>
    </Layout>
  );
}
