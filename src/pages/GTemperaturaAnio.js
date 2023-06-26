import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
        
import { api, graficosApi } from "../api/api";
import { Container } from "../components";

import { Button } from "primereact/button";
import styled from "styled-components";
import { useForm } from "../hooks/useForm";

const IntputContainer = styled.div`
  margin-bottom:10px;
  display:flex;
  justify-content: space-around;
  gap:20px;
  flex-wrap:wrap;
`

export const GTemperaturaAnio = () => {
  const {formulario, handleChange, setFormulario} = useForm({anio1:2018,anio2:2019,anio3:2021,anio4:2022, ciudad:'Sydney'})
  const [ciudades, setCiudades] = useState([])
  const [years, setYears] = useState([])
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const cargarAnios = async() => {
    const res = await api.get('/anios')
    const {data} = res.data
    setYears(data)
  }

  const cargarDatos = async (documentStyle) => {
    
    const res = await graficosApi.post("/temperatura_anio",{...formulario});
    const { data } = res.data;

    const dataGrafico = {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: formulario.anio1,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: Object.values(data.anio1),
        },
        {
          label: formulario.anio2,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--green-500"),
          data: Object.values(data.anio2),
        },
        {
          label: formulario.anio3,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--red-500"),
          data: Object.values(data.anio3),
        },
        {
          label: formulario.anio4,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--purple-500"),
          data: Object.values(data.anio4),
        },
      ],
    };

    setChartData(dataGrafico);

  };

  const cargarCiudades = async () => {
    const res = await api.get('/ciudades')
    const {data} = res.data
    setCiudades(data)
  }

  const cargarOpciones = ({textColor, textColorSecondary, surfaceBorder}) => {
    const options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        }
      },
    };

    setChartOptions(options);
  }

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    
    cargarAnios()
    cargarCiudades()
    cargarDatos(documentStyle);
    cargarOpciones({textColor,textColorSecondary,surfaceBorder})
    
  }, [formulario]);
  return (
    <Container>
      <IntputContainer>
        <div style={{width:'100%', display:'flex',justifyContent:'center'}}>
        <Dropdown style={{width:'50%'}} name="ciudad" options={ciudades} onChange={handleChange} value={formulario.ciudad}/>
        </div>
        <Dropdown style={{width:'150px'}} name="anio1" onChange={handleChange} options={years} value={formulario.anio1}/>
        <Dropdown style={{width:'150px'}} name="anio2" onChange={handleChange} options={years} value={formulario.anio2}/>
        <Dropdown style={{width:'150px'}} name="anio3" onChange={handleChange} options={years} value={formulario.anio3}/>
        <Dropdown style={{width:'150px'}} name="anio4" onChange={handleChange} options={years} value={formulario.anio4}/>
      </IntputContainer>
      <Chart style={{width:'100%'}} type="line" data={chartData} options={chartOptions} />
    </Container>
  );
};
