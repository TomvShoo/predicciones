import { Routes, Route } from "react-router-dom"
import { Prediccion, Graficos } from "../pages"
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
      </Routes>
    </Container>
  )
}
