export const typeDefs = `#graphql
    type Usuarios  {
        id: ID!
        nombre: String!
        telefono: String!
        correo: String!
        direccion: String!
        prestados: [Prestamos]!
    }
    
    type Libros {
        id: ID!
        titulo: String!
        autor: String!
        ISBN: String!
        fechapublicacion: Int!
    }
    
    type Prestamos {
        id: ID!
        usuarioid: String!
        libroid: String!
        fechaprestamo: String!
        fechadevolucion: String!
    }
    
    
    type Query {
        getUser(id:ID!):Usuarios!
        getBooks:[Libros]!
        getBorrowedBooks:[Prestamos]!
    }

    type Mutation {
        addUser(nombre:String!, telefono:String!, correo:String!, direccion:String!):Usuarios!
        addBook(titulo: String!, autor:String!, ISBN:String!, fechapublicacion:Int!):Libros!
        borrowBook(usuarioid:String!, libroid:String!, fechaprestamo:String!, fechadevolucion:String!):Prestamos!
        deleteBorrow(id: ID!):Boolean!
        updateUser(id:ID!, nombre:String!, telefono:String!, correo:String!, direccion:String!):Usuarios!

    }
`