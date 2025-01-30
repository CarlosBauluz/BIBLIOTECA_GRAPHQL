import { GraphQLError } from "graphql";

export const validatephone = async(telefono:string) =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY)throw new GraphQLError("No se ha econtrado la key necesaria")
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    const respuesta = await data.json()

    return respuesta.is_valid
}


export const validatecorreo = async(correo:string) =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY)throw new GraphQLError("No se ha econtrado la key necesaria")
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${correo}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    const respuesta = await data.json()

    return respuesta.is_valid
}