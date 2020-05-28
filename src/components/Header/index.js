import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import DropdownItem from 'react-bootstrap/DropdownItem';

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
          <DropdownItem as={Link} to="visualizarProdutos">
            Produtos
          </DropdownItem>
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
