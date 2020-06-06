import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import VisualizarProdutos from '../pages/produtos/visualizarProdutos';
import CadastrarEditarProdutos from '../pages/produtos/cadastrarEditarProdutos';
import CadastrarTipoProdutos from '../pages/produtos/tipoProduto';
import EditarTipoProdutos from '../pages/produtos/tipoProduto/editarTipo';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/registrar" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route
        path="/cadastrarProdutos"
        component={CadastrarEditarProdutos}
        isPrivate
      />

      <Route
        path="/editarProdutos/:id"
        component={CadastrarEditarProdutos}
        isPrivate
      />
      <Route
        path="/visualizarProdutos"
        component={VisualizarProdutos}
        isPrivate
      />
      <Route path="/tipoProdutos" component={CadastrarTipoProdutos} isPrivate />
      <Route
        path="/editarTipoProdutos/:id"
        component={EditarTipoProdutos}
        isPrivate
      />
    </Switch>
  );
}
