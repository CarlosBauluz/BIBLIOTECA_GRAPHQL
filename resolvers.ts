import { Collection, ObjectId } from "mongodb";
import { Usuarios, Libros, Prestamos } from "./type.ts";
import { GraphQLError } from "graphql";
import { validatecorreo, validatephone } from "./utils.ts";


type Context = {
    usuariosCollection: Collection<Usuarios>
    librosCollection: Collection<Libros>
    prestamosCollection: Collection<Prestamos>
}

type MutationArgsUsuarios = {
    id: string,
    nombre:string,
    telefono:string,
    correo:string,
    direccion:string
}

type MutationArgsLibros = {
    id: string,
    titulo: string
    autor: string
    ISBN: string
    fechapublicacion: number
}

type MutationArgsPrestamos = {
    id:string
    usuarioid: string;
    libroid: string;
    fechaprestamo: string;
    fechadevolucion: string;
    
}

export const resolvers = {
    Usuarios: {
        id: (parent: Usuarios) => parent._id!.toString(),
    },
    Libros: {
        id: (parent: Libros) => parent._id!.toString(),
    },
    Prestamos: {
        id: (parent: Prestamos) => parent._id!.toString(),
        usuarioid: async(parent:Prestamos, args: MutationArgsUsuarios, context: Context) => {
            const mostrar = await context.usuariosCollection.findOne({_id: parent.usuarioid})
            if(!mostrar){throw new GraphQLError("No existe ese usuarioId")}
            return mostrar
        },
        libroid: async(parent:Prestamos, args: MutationArgsLibros, context: Context) => {
            const mostrar = await context.librosCollection.findOne({_id: parent.libroid})
            if(!mostrar){throw new GraphQLError("No existe ese libroId")}
            return mostrar
        },
        fechaprestamo:(parent:Prestamos)=> parent.fechaprestamo.toString(),
        fechadevolucion:(parent:Prestamos) => parent.fechadevolucion.toString()

    },


    Query: {
       
    },
    Mutation: {
        addUser: async(
            _:unknown,
            args:MutationArgsUsuarios,
            context:Context
        ):Promise<Usuarios> =>{
            if(!validatephone(args.telefono)){throw new GraphQLError("Telefono invalido")}
            if(!validatecorreo(args.correo)){throw new GraphQLError("Correo invalido")}
            const {insertedId} = await context.usuariosCollection.insertOne({
                nombre: args.nombre,
                correo: args.correo,
                direccion: args.direccion,
                telefono: args.telefono
            })
            return {
                _id:insertedId,
                ...args
            }
        },
        addBook: async(
            _:unknown,
            args:MutationArgsLibros,
            context:Context,
        ):Promise<Libros> =>{
            const {insertedId} = await context.librosCollection.insertOne({
                titulo: args.titulo,
                autor: args.autor,
                ISBN: args.ISBN,
                fechapublicacion: args.fechapublicacion
            })
            return {
                _id: insertedId,
                ...args
            }
        },
    
        borrowBook: async(
            _:unknown,
            args:MutationArgsPrestamos,
            context:Context
        ):Promise<Prestamos> =>{
            const datosusuario = await context.usuariosCollection.findOne({_id: new ObjectId(args.usuarioid)})
            const datoslibro = await context.librosCollection.findOne({_id: new ObjectId(args.libroid)})
            if(!datosusuario)throw new GraphQLError("NO se encuentra el usuario del prestamo")
  
            const {insertedId} = await context.prestamosCollection.insertOne({
                usuarioid: new ObjectId(args.usuarioid),
                libroid: new ObjectId(args.libroid),
                fechaprestamo: new Date(args.fechaprestamo),
                fechadevolucion: new Date(args.fechadevolucion)
            })
            const respuesta = await context.prestamosCollection.findOne({_id: insertedId})
            if(!respuesta)throw new GraphQLError("No se ha insertado adecuadamente")
            

            return {
                _id:insertedId,
                usuarioid: new ObjectId(args.usuarioid),
                libroid: new ObjectId(args.libroid),
                fechaprestamo: new Date(args.fechaprestamo),
                fechadevolucion: new Date(args.fechadevolucion)

            }
        },
    
        deleteBorrow: async(
            _:unknown,
            args:MutationArgsPrestamos,
            context : Context
        ):Promise<boolean>=>{
            const {deletedCount} = await context.prestamosCollection.deleteOne({_id:new ObjectId(args.id)})
            if(!deletedCount)return false
            return true
        },

    },

    

    //
}