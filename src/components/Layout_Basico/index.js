import React from 'react';
import PropTypes from 'prop-types';

import { Container, Background } from './styles';

export default function Layout({ children, titulo }) {
  return (
    <Container>
      <h3>{titulo}</h3>
      <Background>{children}</Background>
    </Container>
  );
}

Layout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.element.isRequired,
  titulo: PropTypes.string.isRequired,
};
