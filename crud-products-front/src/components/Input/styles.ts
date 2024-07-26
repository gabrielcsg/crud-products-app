import styled from 'styled-components';

interface InputContainerProps {
  error: boolean;
}

export const InputContainer = styled.input<InputContainerProps>`
  border-radius: 6px;
  border: 0;
  border: 1px solid
    ${(props) =>
      props.error ? props.theme['red-300'] : props.theme['gray-900']};
  color: ${(props) => props.theme['gray-800']};
  padding: 1rem;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme['red-300']};
`;
