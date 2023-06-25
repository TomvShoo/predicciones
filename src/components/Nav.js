import { useState } from 'react';
import { ListBox } from 'primereact/listbox';
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 20%;
`

export const Nav = () => {

  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState({ name: 'Predicciones', ruta: '/' });

  const rutas = [
    { name: 'Predicciones', ruta: '/' },
    { name: 'Graficos', ruta: '/graficos' }
  ]

  const handleOptions = (e) => {
    console.log(e.value)
    if (selectedCity == e.value) {
      return
    } else {
      setSelectedCity(e.value)
      navigate(e.value.ruta)
    }

  }

  return (
    <Container>
      <ListBox style={{margin:0, padding:0, height:'100%'}} onChange={handleOptions} options={rutas} optionLabel='name' value={selectedCity} />
    </Container>
  )
}
