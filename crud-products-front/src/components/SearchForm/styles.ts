import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  gap: 0.625rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${(props) => props.theme['gray-100']};
    border: 1px solid ${(props) => props.theme['gray-400']};
    color: ${(props) => props.theme['gray-800']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    min-width: 10%;
  }
`;
