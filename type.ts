import { IntegerType, ObjectId, OptionalId } from "mongodb";

export type Usuarios = OptionalId<{
    nombre: string,
    telefono: string,
    correo: string,
    direccion: string
}>

export type Libros = OptionalId<{
    titulo: string,
    autor: string,
    ISBN: string,
    fechapublicacion: number
}>

export type Prestamos = OptionalId<{
    usuarioid: ObjectId,
    libroid: ObjectId,
    fechaprestamo: Date,
    fechadevolucion: Date
}>

export type Telefono = {
    is_valid: boolean
}

export type Correo = {
    is_valid: boolean
}

