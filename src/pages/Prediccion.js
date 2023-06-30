import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown"
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';
import { InputNumber } from 'primereact/inputnumber';
import styled from 'styled-components'
import { api, prediccionApi } from '../api/api';
import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
// import icono from '../images/Grado.png'

const Container = styled.div`
    margin:0 20px;
    display: flex !important;
    flex-direction: row;
    border: 1px solid rgb(0,0,0,0.15);
`

const Div = styled.div`
    display: flex;
    flex-flow: column wrap;
    gap: 5px;
    justify-content: flex-start;
    border-radius: 5px;
    padding: 0px 10px;
    width: 50%;
`

const DivResultado = styled(Div)`
    flex-flow:row no-wrap;
    gap:0px;
    justify-content:space-arownd;
`

const Title = styled.h1`
    margin: 0;
    font-weight: 400;
`

const Label = styled.label`
    display:block;
`

const ContenedorInput = styled.div`
    display; flex;
    flex-flow: row wrap;
    width: 100% 
`

const Boton = styled(Button)`
    width: 100px;
    margin: 10px 0;
`

const Span = styled.span`
    font-size:50px;
    display: flex; 
    gap: 50px;
}

`

export const Prediccion = () => {
    const {formulario, handleChange } = useForm({evaporacion:'0',sunshine:'0',temp3pm:'0', ciudad:''})
    const [ciudades, setCiudades] = useState([])
    const [temperatura, setTemperatura] = useState()

    const cargarCiudades = async () => {
        const res = await api.get('/ciudades')
        const {data} = res.data
        setCiudades(data)
    }

    const handleInput = (x) => {
        const target = x
        handleChange(target)
    }

    const enviar = async () => {
        console.log(formulario)
        const res = await prediccionApi.post('/',{...formulario})
        const {data} = res.data
        setTemperatura(data.predicted_temp[0].toFixed(1))
        // setTemperatura(data.prected_temp[0].toFixed(2))

    }

    useEffect(() => {
        cargarCiudades()
    }, [])
    
    return (

        <Container>
            <Div>
                <Title>Ingrese valores: </Title> 
                <Dropdown options={ciudades} name='ciudad' onChange={handleChange} value={formulario.ciudad} placeholder='Seleccione una ciudad'/>
                <ContenedorInput>
                    <Label>Evaporation</Label>
                    <InputText  style={{width:'100%'}} name='evaporacion' onChange={handleInput} value={formulario.evaporacion}/>
                </ContenedorInput>

                <ContenedorInput>
                    <Label>Sunshine</Label>
                    <InputText style={{width:'100%'}} name='sunshine' onChange={handleInput} value={formulario.sunshine}/>
                </ContenedorInput>

                <ContenedorInput>
                    <Label>Temperatura 3pm</Label>
                    <InputText style={{width:'100%'}} name='temp3pm' onChange={handleInput} value={formulario.temp3pm}/>
                </ContenedorInput>
                <Boton label="Submit" severity="success" onClick={enviar}/>
            </Div>

            <DivResultado>
                <Title style={{marginBottom:"50px"}}>Temperatura maxima:</Title>
                <Card style={{textAlign:'center'}}>
                    
                    {temperatura 
                    ?
                    <>
                        <Span>
                        <i style={{fontSize:'32px'}} className="pi pi-cloud"></i>
                        {temperatura}
                        
                        </Span>
                        {/* <Dropdown style={{fontSize:'16px'}} dropdownIcon={<img alt="dropdown icon" src={icono} />} /> */}
                    </>
                    :<Span>Esperando prediccion</Span>
                    
                    }
                    
                    
                </Card>
            </DivResultado>
            
        </Container>

    )
} 
