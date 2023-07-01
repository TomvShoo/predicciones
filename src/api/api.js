import axios from "axios";

export const graficosApi = axios.create({
    baseURL:'https://apipredicciones.onrender.com/graficos'
})

export const api = axios.create({
    baseURL:'https://apipredicciones.onrender.com'
})

export const prediccionApi = axios.create({
    baseURL:'https://apipredicciones.onrender.com/predicciones'
})