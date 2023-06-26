import { Routes, Route } from "react-router-dom"
import { Prediccion, Graficos, ValoresNulos, GTemperaturaAnio, GVelocidadViento, GComparacion } from "../pages"
import styled from "styled-components"

const Container = styled.div`
  width: 80%;
`

export const Rutas = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Prediccion />} />
        <Route path='/graficos' element={<Graficos />} />
        <Route path='/valores_nulos' element={<ValoresNulos />} />
        <Route path='/temperatura_anio' element={<GTemperaturaAnio />} />
        <Route path='/velocidad_viento' element={<GVelocidadViento />} />
        <Route path='/comparacion' element={<GComparacion />} />
      </Routes>
    </Container>
  )
}
