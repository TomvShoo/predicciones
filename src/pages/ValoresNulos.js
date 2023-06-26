import { Chart } from "primereact/chart";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { graficosApi } from "../api/api";
import { Button } from "primereact/button";
import { Container } from "../components";


export const ValoresNulos = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const cargarDatos = async () => {
    const res = (await graficosApi.get('/valores_nulos')).data;
    console.log()
    const datos = {
      // labels: res.data.map((res) => res.column),
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
          label:'Valores nulos',
          data: res.data.map((res) => res.value),
          backgroundColor: "#42A5F5",
          hoverBackgroundColor: "#64B5F6",
        },
      ],
    };
    setChartData(datos);
  };

  useEffect(() => {
    cargarDatos()
  }, []);

  return (
    <Container>
      <Chart style={{width:'100%'}} type="bar" data={chartData} options={{indexAxis:'y'}}/>
    </Container>
  );
};
