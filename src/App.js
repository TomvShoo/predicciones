import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import { Prediccion } from './pages';

import { Header, Rutas, Nav } from './components'


const Container = styled.div`
  display: flex;
  flex-flow:row wrap;
  justify-content:center;
`

const Content = styled.div`
  width: 95%;
  padding:10px;
  margin-top:20px;
  display:flex;
  flex-flow: row wrap;
`;

const App = () => {
  return (

    <Container>
      <Header />
      <Content>

        <Nav />
        <Rutas />
      </Content>
    </Container>
  );
}

export default App;
