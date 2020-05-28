import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { Container, Background, ButtonStyle } from './styles';

export default function VisualizarProdutos() {
  const history = useHistory();
  function handleSubmit(data) {
    console.log(data);
  }
  function handleInsert() {
    history.push('/cadastrarProdutos');
  }

  return (
    <Container>
      <h3>Consultar Produtos</h3>
      <Background>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridNome" sm={8}>
              <Form.Label>Produto</Form.Label>
              <Form.Control
                name="nome"
                type="text"
                placeholder="Nome do Produto"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTipo">
              <Form.Label>Tipo do Produto</Form.Label>
              <Form.Control as="select" name="tipo" custom>
                <option>Tipo do Produto</option>
                <option>1</option>
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
            <Button variant="outline-secondary" size="lg" type="button">
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
      </Background>
    </Container>
  );
}
