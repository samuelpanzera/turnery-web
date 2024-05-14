import React from "react";
import styled from "styled-components";

const StyledError = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function NotFoundPage() {
  return (
    <StyledError>
      <h1>404</h1>
      <p>Página não encontrada</p>
    </StyledError>
  );
}

export default NotFoundPage;
