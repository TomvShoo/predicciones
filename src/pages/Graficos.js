import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import styled from "styled-components";
import { graficosApi } from "../api/api";

import { Button } from "primereact/button";

const Container = styled.div``;

export const Graficos = () => {
  const [datos, setDatos] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const cargarDatos = async (x) => {
    const res = (await graficosApi.get()).data;
    setDatos(res.data)
  };

  useEffect(() => {
    cargarDatos();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
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
          label: "Dataset 1",
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          yAxisID: "y",
          tension: 0.4,
          data: [65, 59, 80, 81, 56, 55, 10, 28, 48, 40, 19, 86],
        },
        {
          label: "Dataset 2",
          fill: false,
          borderColor: documentStyle.getPropertyValue("--green-500"),
          yAxisID: "y1",
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
        },
        {
          label: "Dataset 3",
          fill: false,
          borderColor: documentStyle.getPropertyValue("--red-500"),
          yAxisID: "y2",
          tension: 0.4,
          data: [8, 99, 6, 19, 86, 78, 90, 65, 67, 68, 46, 21],
        },
        {
          label: "Dataset 4",
          fill: false,
          borderColor: documentStyle.getPropertyValue("--purple-500"),
          yAxisID: "y3",
          tension: 0.4,
          data: [4, 42, 76, 15, 24, 67, 36, 18, 95, 12, 4, 21],
        },
      ],
    };
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
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
        y2: {
          type: "linear",
          display: true,
          position: "right",
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
        y3: {
          type: "linear",
          display: true,
          position: "right",
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <Container>
      <Chart type="line" data={chartData} options={chartOptions} />
      <Button label="prueba" onClick={() => console.log(datos)} />
    </Container>
  );
};
