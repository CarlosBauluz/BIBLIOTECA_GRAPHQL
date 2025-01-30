import { MongoClient } from "mongodb"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";
import { GraphQLError } from "graphql";
import { Libros,Usuarios,Prestamos } from "./type.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL) throw new GraphQLError("MONGO URL NOT EXISTS")

const client = new MongoClient(MONGO_URL)
await client.connect()
console.log("Conectado a la base de datos")

const db = client.db("Biblioteca")
const usuariosCollection = db.collection<Usuarios>("Usuarios")
const librosCollection = db.collection<Libros>("Libros")
const prestamosCollection = db.collection<Prestamos>("Prestamos")


const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server,{
  context: async() => ({ usuariosCollection, librosCollection, prestamosCollection })
})

console.log(`🚀  Server ready at: ${url}`);