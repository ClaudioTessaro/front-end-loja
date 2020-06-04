import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import Layout from '../../../../components/Layout_Basico';
import Input from '../../../../components/Formulario/Input';
import { ButtonStyle } from '../../visualizarProdutos/styles';

import api from '../../../../services/api';

export default function EditarTipoProdutos(path) {
  const [produto, setProduto] = useState([]);
  const { id } = path.match.params;

  useEffect(() => {
    async function tipoProdutos() {
      const response = await api.get(`/tipoProduto/${id}`);
      setProduto(response.data);
    }
    tipoProdutos();
  });

  async function handleUpdate(data) {
    try {
      await api.put(`/tipoProduto/${id}`, data);
      toast.success('Tipo de produto atualizado com sucesso');
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <Layout titulo="Editar o  Tipo Produto">
      <Form initialData={produto} onSubmit={handleUpdate}>
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
        <Link to="/tipoProdutos">
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
