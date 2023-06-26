import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown"
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import styled from 'styled-components'
import { api, prediccionApi } from '../api/api';
import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';

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

export const Prediccion = () => {
    const {formulario, handleChange } = useForm({evaporacion:'',sunshine:'',temp3pm:'', ciudad:''})
    const [ciudades, setCiudades] = useState([])

    const evaporacion = ""
    const sunshine = ""
    const temp3pm = ""

    const cargarCiudades = async () => {
        const res = await api.get('/ciudades')
        const {data} = res.data
        setCiudades(data)
    }

    const handleInput = ({originalEvent}) => {
        handleChange(originalEvent)
    }

    const enviar = async () => {
        const res = await prediccionApi.post('/',{...formulario})
        console.log(res)

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
                    <InputNumber style={{width:'100%'}} name='evaporacion' onChange={handleInput} value={formulario.evaporacion}/>
                </ContenedorInput>

                <ContenedorInput>
                    <Label>Sunshine</Label>
                    <InputNumber style={{width:'100%'}} name='sunshine' onChange={handleInput} value={formulario.sunshine}/>
                </ContenedorInput>

                <ContenedorInput>
                    <Label>Temperatura 3pm</Label>
                    <InputNumber style={{width:'100%'}} name='temp3pm' onChange={handleInput} value={formulario.temp3pm}/>
                </ContenedorInput>
                <Boton label="Submit" severity="success" onClick={enviar}/>
            </Div>

            <Div>
                <Title>Temperatura maxima:</Title>
            </Div>
        </Container>

    )
} 
