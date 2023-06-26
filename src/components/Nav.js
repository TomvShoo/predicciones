import { Tree } from "primereact/tree";
import { ListBox } from "primereact/listbox";

import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 20%;
`;

export const Nav = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState({
    name: "Predicciones",
    ruta: "/",
  });

  const rutas = [
    { key: 1, label: "Predicciones", ruta: "/" },
    { 
      key: 2, 
      label: "Graficos", 
      children: [
        {
          key:1,
          label:"Valores nulos",
          ruta:'valores_nulos'
        },
        {
          key:2,
          label:"Temperatura por año",
          ruta:"temperatura_anio"
        },
        {
          key:3,
          label:"Velocidad del viento",
          ruta:"velocidad_viento"
        },
        {
          key:4,
          label:"Comparación de variables",
          ruta:"comparacion"
        }
      ] 
    },
  ];
  // const rutas = [
  //   { name: 'Predicciones', ruta: '/' },
  //   { name: 'Graficos', ruta: '/graficos' }
  // ]

  const handleOptions = (e) => {
    if(!e.node.ruta) return

    const {ruta} = e.node
    navigate(ruta)
    console.log(ruta)
    // console.log(e.value);
    // if (selectedCity == e.value) {
    //   return;
    // } else {
    //   setSelectedCity(e.value);
    //   navigate(e.value.ruta);
    // }
  };

  return (
    <Container>
      {/* <ListBox style={{margin:0, padding:0, height:'100%'}} onChange={handleOptions} options={rutas} optionLabel='name' value={selectedCity} /> */}
      <Tree value={rutas}  onNodeClick={handleOptions}/>
    </Container>
  );
};
