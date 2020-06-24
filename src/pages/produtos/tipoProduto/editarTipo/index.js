import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Layout from '../../../../components/Layout_Basico';
import { ButtonStyle } from '../../visualizarProdutos/styles';

import api from '../../../../services/api';
import UtilService from '../../../../services/Util/index';
import history from '../../../../services/history';

const schema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
});

export default function EditarTipoProdutos(path) {
  const [produto, setProduto] = useState([]);
  const { id } = path.match.params;

  useEffect(() => {
    async function tipoProdutos() {
      const response = await api.get(`/tipoProduto/${id}`);
      setProduto(response.data);
    }
    tipoProdutos();
  }, [id]);

  async function handleUpdate(data) {
    try {
      const response = await api.put(`/tipoProduto/${id}`, data);
      UtilService.retornoUtil(response);
      history.push('/tipoProdutos');
    } catch (err) {
      toast.error('Problema com o servidor');
    }
  }

  return (
    <Layout titulo="Editar o Tipo Produto">
      <Form schema={schema} initialData={produto} onSubmit={handleUpdate}>
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
