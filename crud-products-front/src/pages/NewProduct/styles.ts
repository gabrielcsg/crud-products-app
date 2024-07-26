import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    button[type='submit'] {
      height: 58px;
    }
  }
`;
