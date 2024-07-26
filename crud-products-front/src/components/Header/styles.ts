import styled from 'styled-components';

export const Container = styled.header`
  background-color: ${(props) => props.theme['gray-500']};
  padding: 2rem 0;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 50px;
    background-color: transparent;
    border: 1px solid ${props => props.theme['gray-700']}
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.675rem;
`;

export const Title = styled.span`
  color: ${(props) => props.theme['gray-900']};
  font-size: 2rem;
  font-weight: 700;
`;
