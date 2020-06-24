import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #e9ecef;

  span:not(.MuiIconButton-label) {
    color: #fb6f91;
    align-self: center;
    margin: 15px 0px 0px;
    margin-bottom: -20px;
    font-weight: bold;
  }

  @media (min-width: 321px) and (max-device-width: 480px) {
    height: 180%;
  }
  @media (max-device-width: 320px) {
    height: 210%;
  }
  @media (min-width: 480px) and (max-width: 840px) {
    height: 350%;
  }
`;
