import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  background: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:not(:disabled):hover {
    background: ${(props) => props.theme['gray-800']};
    transition: background-color 0.5s;
  }
`;
