import styled from 'styled-components';
import Jumbotron from 'react-bootstrap/Jumbotron';

export const Container = styled.div`
  margin: 35px 50px 0px 50px;

  h3 {
    margin-left: 15%;
  }
`;
export const Background = styled(Jumbotron)`
  background-color: #ffffff !important;
  max-width: 70%;
  margin-left: 15%;

  @media (min-width: 321px) and (max-device-width: 480px) {
    max-width: 100%;
  }
  @media (max-device-width: 320px) {
    height: 100%;
  }
  @media (min-width: 480px) and (max-width: 840px) {
    height: 100%;
  }
`;
