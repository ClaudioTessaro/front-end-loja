/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import queryString from 'query-string';
import Layout from '../../../components/Layout_Basico';
import { ButtonStyle } from './styles';

import api from '../../../services/api';

export default function VisualizarProdutos(props) {
  const [tipoProduto, setTipoProduto] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadTipoProduto() {
      const response = await api.get('/tipoProduto');
      setTipoProduto(response.data);
    }
    loadTipoProduto();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const { dataFim, dataInicio, nome, tipo } = queryString.parse(
      props.location.search
    );
  }, [props]);

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
          <Button variant="outline-secondary" size="lg" type="reset">
            Limpar
          </Button>
          <Button
            variant="success"
            size="lg"
            type="button"
            onClick={handleInsert}
          >
            Incluir
          </Button>
          <Button variant="primary" size="lg" type="submit">
            Enviar
          </Button>
        </ButtonStyle>
      </Form>
    </Layout>
  );
}
