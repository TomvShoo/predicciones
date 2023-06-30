import { Chart } from "primereact/chart"
import { Container } from "../components"
import { useEffect, useState } from "react"
import { useForm } from "../hooks/useForm"
import { api, graficosApi } from "../api/api"
import styled from "styled-components"
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from "primereact/dropdown"

const InputContainer = styled.div`
    margin-bottom:20px;
    display:flex;
    justify-content:center;
    gap:50px;
    width:100%;
`

export const GVelocidadViento = () => {
    const [loading, setLoading] = useState(true)
    const {formulario, handleChange } = useForm({ciudad:'Sydney',anio:2022})
    const [chartData, setChartData] = useState({})
    const [ciudades, setCiudades] = useState([])
    const [anios, setAnios] = useState([])


    const cargarDatos = async () => {
        setLoading(true)
        const res = await graficosApi.post('/velocidad_viento',formulario)
        const {data:respuesta} = res
        const {data} = respuesta
        const datos = {
            // labels:Object.values(data.month).map(mes => mes),
            labels: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ],
            datasets:[
                {
                    label:`Velocidad del viento en ${formulario.ciudad} en ${formulario.anio}`,
                    data: Object.values(data.viento).map(viento => viento),
                    // data:[12,32,15,64,23,89,23,72,45,86,23,51],
                    backgroundColor: "#42A5F5",
                    hoverBackgroundColor: "#64B5F6",
                  
                }
            ]
        }

        setChartData(datos)
        setLoading(false)
    }

    const cargarCiudades = async () => {
        const res = await api.get('/ciudades')
        const {data} = res.data
        setCiudades(data)
    }
    const cargarAnios = async () => {
        const res = await api.get('/anios')
        const {data} = res.data
        setAnios(data)
    }
    
    useEffect(() => {
        cargarDatos()
        cargarCiudades()
        cargarAnios()
    
    }, [formulario])
    
  return (
    <Container>
        <InputContainer>
            <Dropdown disabled={loading} style={{width:'200px',height:'45px'}} options={ciudades} placeholder="Selecione una ciudad" name="ciudad" onChange={handleChange} value={formulario.ciudad}/>
            <Dropdown disabled={loading} style={{width:'200px',height:'45px'}} options={anios} placeholder="Selecione un año" name="anio" onChange={handleChange} value={formulario.anio}/>
        </InputContainer>

        {loading
        ?<ProgressSpinner/>
        :<Chart style={{width:'100%'}} type="bar" data={chartData}/>}
        
    </Container>
  )
}
