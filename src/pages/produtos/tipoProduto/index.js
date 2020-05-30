import React from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Layout from '../../../components/Layout_Basico';
import Input from '../../../components/Formulario/Input';

import { ButtonStyle } from '../visualizarProdutos/styles';

export default function CadastrarTipoProduto() {
  return (
    <Layout fluid>
      <Form>
        <div className="form-group col-md-4">
          <Input
            ype="text"
            name="tipoProduto"
            className="form-control"
            id="inputNome"
            label="Nome do Produto"
          />
        </div>
        <ButtonStyle className="float-right" style={{ height: '40px' }}>
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
