import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownButton from 'react-bootstrap/DropdownButton';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Dropdown from 'react-bootstrap/Dropdown';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Navbar bg="light" expand="lg">
      <Dropdown>
        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
          <MenuIcon />
        </Dropdown.Toggle>
        <Link to="/dashboard">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
        <Dropdown.Menu>
          <DropdownButton
            variant="Secondary"
            id="button-drop-right"
            drop="right"
            title="Produtos"
          >
            <DropdownItem as={Link} to="/visualizarProdutos">
              Pesquisar Produtos
            </DropdownItem>
            <DropdownItem as={Link} to="/cadastrarProdutos">
              Cadastrar Produtos
            </DropdownItem>
            <DropdownItem as={Link} to="/tipoProdutos">
              Tipo de Produtos
            </DropdownItem>
          </DropdownButton>
          <DropdownButton
            variant="Secondary"
            id="button-drop-right"
            drop="right"
            title="Cliente"
          >
            <DropdownItem as={Link} to="/cliente">
              Cadastrar Cliente
            </DropdownItem>
            <DropdownItem as={Link} to="/visualizarClientes">
              Visualizar Clientes
            </DropdownItem>
          </DropdownButton>
          <DropdownButton
            variant="Secondary"
            id="button-drop-right"
            drop="right"
            title="Vendas"
          >
            <DropdownItem as={Link} to="/venda">
              Cadastrar Venda
            </DropdownItem>
            <DropdownItem as={Link} to="/visualizarVendas">
              Consultar Vendas
            </DropdownItem>
          </DropdownButton>
          <DropdownButton
            variant="Secondary"
            id="button-drop-right"
            drop="right"
            title="Compra"
          >
            <DropdownItem as={Link} to="/compra">
              Atualizar Estoque
            </DropdownItem>
          </DropdownButton>
          <DropdownItem>
            <IconButton onClick={handleLogout}>
              <ExitToAppOutlinedIcon />
            </IconButton>
          </DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
}
