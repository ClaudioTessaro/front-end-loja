import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Select from "../../../components/Formulario/Select";
import Layout from "../../../components/Layout_Basico";
import Input from "../../../components/Formulario/Input";
import { ButtonStyle } from "../visualizarProdutos/styles";

import history from "../../../services/history";

import api from "../../../services/api";

export default function CadastrarEditarProdutos(path) {
  const [tipoProduto, setTipoProduto] = useState([]);
  const [produto, setProduto] = useState([]);
  const [visible, setVisible] = useState([]);
  const { id } = path.match.params;

  const { pathname } = path.location;

  useEffect(() => {
    async function loadTipoProduto() {
      const response = await api.get("/tipoProduto");
      setTipoProduto(response.data);
    }
    loadTipoProduto();
  }, []);
  useEffect(() => {
    async function loadProduto() {
      const response = await api.get(`/produto/${id}`);
      const { dataDaCompra } = response.data;
      const dataCompra = dataDaCompra.split("T")[0];
      setProduto({
        ...response.data,
        dataCompra,
      });
    }
    loadProduto();
  }, [id]);

  async function handleInsertSubmit(data, { reset }) {
    await api.post("/produto", data);
    reset();
  }
  async function handleUpdateProduto(data) {
    try {
      await api.put(`/produto/${id}`, data);
      toast.success("Produto atualizado com sucesso");
      history.push("/visualizarProdutos");
    } catch (err) {
      toast.error(err);
    }
  }

  function handlVisible(e) {
    const { options, selectedIndex } = e.target;
    if (options[selectedIndex].innerHTML === "Escova") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  return (
    <Layout
      titulo={
        pathname === "/cadastrarProdutos"
          ? "Cadastrar Produto"
          : "Editar Produto"
      }
    >
      <Form
        initialData={pathname === "/cadastrarProdutos" ? {} : produto}
        onSubmit={
          pathname === "/cadastrarProdutos"
            ? handleInsertSubmit
            : handleUpdateProduto
        }
      >
        <div className="form-row">
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="nome"
              className="form-control"
              id="inputNome"
              label="Nome do Produto"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-4">
            <Input
              type="text"
              name="marcaProduto"
              className="form-control"
              id="inputMarca"
              label="Marca do Produto"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Scope path="tipoProduto">
              <Select
                name="tipoProduto"
                id="inputState"
                className="form-control"
                label="Tipo do Produto"
                data={tipoProduto}
                onChange={(e) => handlVisible(e)}
              />
            </Scope>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="valorCompra"
              className="form-control"
              id="valorDaCompra"
              label="Valor da Compra do Produto"
              step="any"
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="quantidade"
              className="form-control"
              id="inputNome"
              label="Quantidade"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Input
              type="date"
              name={
                pathname === "/cadastrarProdutos"
                  ? "dataDaCompra"
                  : "dataCompra"
              }
              className="form-control"
              id="dataDaCompra"
              label="Data da compra"
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="number"
              min="1"
              name="porcentagemLucro"
              className="form-control"
              id="porcentagemLucro"
              label="% de Lucro"
            />
          </div>
          <div className="form-group col-md-1" />
          <div className="form-group col-md-2">
            <Input
              disabled={produto.valorVenda === undefined}
              type="number"
              name="valorVenda"
              className="form-control"
              id="valorVenda"
              label="Valor de venda"
              step="any"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="valorPote"
              className="form-control"
              id="valorPote"
              label="Valor do pote"
              step="any"
              disabled={visible}
            />
          </div>
          <div className="form-group col-md-2">
            <Input
              type="number"
              name="frete"
              className="form-control"
              id="inputNome"
              label="Frete"
              step="any"
            />
          </div>
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
            style={({ height: "40px" }, { margin: "7px 0px" })}
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
