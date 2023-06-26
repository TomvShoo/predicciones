import { useState } from "react"

export const useForm = (initialState) => {
    const [formulario, setFormulario] = useState(initialState)

    const handleChange = ({target}) => {
        const {name, value} = target
        console.log(target)
        setFormulario({
            ...formulario,
            [name]:value
        })
    }

    const limpiarFormulario = () =>{
        setFormulario(initialState)
    }

    return {
        ...formulario,
        formulario,
        handleChange,
        limpiarFormulario,
        setFormulario
    }
}