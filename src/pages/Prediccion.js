import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import styled from 'styled-components'

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
    const evaporacion = ""
    const sunshine = ""
    const temp3pm = ""

    return (

        <Container>
            <Div>
                <Title>Ingrese valores: </Title> 

                <ContenedorInput>
                    <Label>Evaporation</Label>
                    <InputNumber style={{width:'100%'}}/>
                </ContenedorInput>

                <ContenedorInput>
                    <Label>Sunshine</Label>
                    <InputNumber style={{width:'100%'}}/>
                </ContenedorInput>

                <ContenedorInput>
                    <Label>Temperatura 3pm</Label>
                    <InputNumber style={{width:'100%'}}/>
                </ContenedorInput>
                <Boton label="Submit" severity="success" />
            </Div>

            <Div>
                <Title>Temperatura maxima:</Title>
            </Div>
        </Container>

    )
} 
