import styled from 'styled-components';

export type TypeLoading = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeLoading;
};

export const Container = styled.span<ContainerProps>`
  svg {
    width: 2rem;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: ${(props) =>
      props.type === 'primary'
        ? props.theme['gray-800']
        : props.theme['gray-100']};
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
  }

  @keyframes rotate4 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash4 {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dashoffset: -125px;
    }
  }
`;
