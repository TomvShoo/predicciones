import axios from "axios";

export const graficosApi = axios.create({
    baseURL:'http://127.0.0.1:5000/graficos'
})

export const api = axios.create({
    baseURL:'http://127.0.0.1:5000'
})

export const prediccionApi = axios.create({
    baseURL:'http://127.0.0.1:5000/predicciones'
})