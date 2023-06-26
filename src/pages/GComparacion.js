import React, { useEffect, useState } from "react";
import { Container } from "../components";
import { Chart } from "primereact/chart";
import { useForm } from "../hooks/useForm";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import { api, graficosApi } from "../api/api";

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100%;
`;

export const GComparacion = () => {
  const [variables, setVariables] = useState([
    "Humedad",
    "Viento",
    "Temperatura",
  ]);
  const { formulario, handleChange } = useForm({
    variable1: variables[0],
    variable2: variables[1],
    anio: 2022,
    ciudad: "Sydney",
  });
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  const cargarOpciones = () => {
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
    setChartOptions(options);
  };

  const cargarGrafico = async () => {
    const res = await graficosApi.post("/comparacion", { ...formulario });
    const { data } = res.data;
    const keys = Object.keys(data)

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
      datasets: [
        {
          label: formulario.variable1,
          // data: Object.values(data.viento).map(viento => viento),
          data: Object.values(data[keys[0]]).map(v => v),
          // data:[12,32,15,64,23,89,23,72,45,86,23,51],
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
        },
        {
          label: formulario.variable2,
          // data: Object.values(data.viento).map(viento => viento),
        //   data: [12, 32, 15, 64, 23, 89, 23, 72, 45, 86, 23, 51],
          data: Object.values(data[keys[1]]).map(v => v),
          // data:[12,32,15,64,23,89,23,72,45,86,23,51],
          backgroundColor: documentStyle.getPropertyValue("--pink-500"),
          borderColor: documentStyle.getPropertyValue("--pink-500"),
        },
      ],
    };

    setChartData(datos);
    console.log(formulario);
  };

  useEffect(() => {
    cargarOpciones();
  }, []);

  useEffect(() => {
    cargarGrafico();
  }, [formulario]);

  return (
    <Container>
      <InputContainer>
        <Dropdown
          style={{ width: "250px" }}
          options={variables}
          placeholder="Selecione una variable"
          name="variable1"
          onChange={handleChange}
          value={formulario.variable1}
        />
        <Dropdown
          style={{ width: "250px" }}
          options={variables}
          placeholder="Selecione una variable"
          name="variable2"
          onChange={handleChange}
          value={formulario.variable2}
        />
      </InputContainer>
      <Chart
        style={{ width: "100%" }}
        type="bar"
        data={chartData}
        options={chartOptions}
      />
    </Container>
  );
};
