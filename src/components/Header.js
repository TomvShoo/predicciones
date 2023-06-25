import styled from "styled-components"


const Container = styled.div`
  padding:20px;
  width:100%;
  border: 1px solid rgb(0,0,0,.1);
`

const Title = styled.h1`
  margin:0;
  padding:0;
`;

export const Header = () => {
  return (
    <Container>
      <Title>
        Predicciones de Temperatura
      </Title>
    </Container>
  )
}
