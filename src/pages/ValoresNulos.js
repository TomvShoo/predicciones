import { Chart } from "primereact/chart";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { graficosApi } from "../api/api";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Container } from "../components";


export const ValoresNulos = () => {

const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const cargarDatos = async () => {
    const res = (await graficosApi.get('/valores_nulos')).data;
    const columnas = res.data.map(x => x.column)
    const valores = res.data.map(x => x.value)
    
    const datos = {
      // labels: res.data.map((res) => res.column),
      labels: columnas.map(v => v),
      datasets: [
        {
          label:'Valores nulos',
          data: valores.map(v => v),
          backgroundColor: "#42A5F5",
          hoverBackgroundColor: "#64B5F6",
        },
      ],

    };
    setLoading(false)
    setChartData(datos);
  };

  useEffect(() => {
    cargarDatos()
  }, []);

  return (
    <Container>

      {loading 
      ?<ProgressSpinner/>
      :<Chart style={{width:'100%'}} type="bar" data={chartData} options={{indexAxis:'y'}}/>
    }
    </Container>
  );
};
