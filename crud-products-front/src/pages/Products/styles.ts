import styled from 'styled-components';

export const ProductsContainer = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
`;

export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;

  tr {
    th {
      background-color: ${(props) => props.theme['gray-300']};
      padding: 1.25rem;
      &:first-child {
        border-top-left-radius: 6px;
      }
      &:last-child {
        border-top-right-radius: 6px;
      }
    }

    td {
      border-bottom: 0.5px solid ${(props) => props.theme['gray-300']};
      padding: 1.25rem;
      text-align: center;

      button {
        height: 2rem;
      }
    }

    &:last-child {
      td {
        &:first-child {
          border-bottom-left-radius: 6px;
        }
        &:last-child {
          border-bottom-right-radius: 6px;
        }
      }
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.675rem;
`;
