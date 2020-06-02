import React, { useState, useEffect } from 'react';

import { Form } from '@unform/web';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Layout from '../../../../components/Layout_Basico';
import Input from '../../../../components/Formulario/Input';
import api from '../../../../services/api';
import { ButtonStyle } from '../../visualizarProdutos/styles';

export default function EditarTipoProdutos() {
  async function handleUpdate(data, { reset }) {
    try {
      await api.post('tipoProduto', data);
      toast.success('Tipo de Produto cadastrado com sucesso');
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Layout titulo="Cadastrar Tipo Produto">
      <Form onSubmit={handleUpdate}>
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
    </Layout>
  );
}
