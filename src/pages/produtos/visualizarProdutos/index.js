/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import queryString from 'query-string';
import Layout from '../../../components/Layout_Basico';
import { ButtonStyle, Tab } from './styles';

import * as actions from '../../../store/modules/produtos/action';

import api from '../../../services/api';
import UtilService from '../../../services/Util/index';

export default function VisualizarProdutos({ location }) {
  const [tipoProduto, setTipoProduto] = useState([]);
  const [produto, setProduto] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const history = useHistory();

  function handleUpdate(id) {
    dispatch(actions.updateProduto(id));
  }

  useEffect(() => {
    async function loadTipoProduto() {
      const response = await api.get('/tipoProduto');
      setTipoProduto(response.data);
    }
    loadTipoProduto();
  }, []);

  useEffect(() => {
    async function loadProdutos() {
      const { dataFim, dataInicio, nome, tipo } = queryString.parse(
        location.search
      );
      const produtos = await api.get(
        `/produtos?page=${currentPage}&limit=${limit}&nome=${nome}&tipo=${tipo}&dataInicio=${dataInicio}&dataFim=${dataFim}`
      );
      setTotal(produtos.headers['x-total-count']);
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }
      setPages(arrayPages);
      setProduto(produtos.data);
    }
    loadProdutos();
  }, [location.search, currentPage, limit, total]);

  async function loadRefresh() {
    const { dataFim, dataInicio, nome, tipo } = queryString.parse(
      location.search
    );
    const response = await api.get(
      `/produtos?nome=${nome}&tipo=${tipo}&dataInicio=${dataInicio}&dataFim=${dataFim}`
    );
    setProduto(response.data);
  }

  async function handleDelete(id) {
    try {
      const response = await api.delete(`produto/${id}`);
      UtilService.retornoUtil(response);
      loadRefresh();
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }

  function handleInsert() {
    history.push('/cadastrarProdutos');
  }

  return (
    <Layout titulo="Consultar produtos">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridNome" sm={6}>
            <Form.Label>Produto</Form.Label>
            <Form.Control
              name="nome"
              type="text"
              placeholder="Nome do Produto"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTipo" sm={2} />
          <Form.Group as={Col} controlId="formGridTipo" sm={4}>
            <Form.Label>Tipo do Produto</Form.Label>
            <Form.Control as="select" name="tipo" custom>
              <option value="" />
              {tipoProduto.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="dataInicio" sm={1.5}>
            <Form.Label>Data Inicial</Form.Label>
            <Form.Control type="date" name="dataInicio" />
          </Form.Group>
          <Form.Group as={Col} controlId="dataFim" sm={1.5}>
            <Form.Label>Data Final</Form.Label>
            <Form.Control type="date" name="dataFim" />
          </Form.Group>
        </Form.Row>
        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" type="reset">
            Limpar
          </Button>
          <Button variant="success" type="button" onClick={handleInsert}>
            Incluir
          </Button>
          <Button variant="primary" type="submit">
            Pesquisar
          </Button>
        </ButtonStyle>
        <Tab>
          <caption>Quantidade</caption>
          <select
            onChange={e => setLimit(e.target.value)}
            className="form-control form-control-sm"
            style={{ width: '70px' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <div className="table-responsive">
            <table className="table">
              <caption>Lista dos Produtos</caption>
              <thead>
                <tr>
                  <th scope="col">Codigo</th>
                  <th scope="col">Nome do Produto</th>
                  <th scope="col">Quantidade do Produto Comprado</th>
                  <th scope="col">Marca do Produto</th>
                  <th scope="col">Tipo do Produto</th>
                  <th scope="col">Quantidade do Produto em Estoque</th>
                  <th scope="col">Valor de Venda</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {produto.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.nome}</td>
                    <td>{prod.quantidade}</td>
                    <td>{prod.marcaProduto}</td>
                    <td>{prod.tipo.nome}</td>
                    <td>{prod.quantidadeDeEstoque}</td>
                    <td>{parseFloat(prod.valorVenda).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleUpdate(prod.id)}
                      >
                        <BsPencil size={20} />
                      </button>
                    </td>
                    <td>
                      <button type="button">
                        <BsFillTrashFill
                          size={20}
                          onClick={() => handleDelete(prod.id)}
                        />
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
