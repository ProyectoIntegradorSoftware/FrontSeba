import { gql } from "@apollo/client";

export const GET_TRABAJOS = gql`
  query {
    trabajos {
        id
        titulo
        descripcion
        salario
    }
  }
`;

export const GET_POSTULACIONES = gql`
  query obtenerUsuario($userID: ID!){
    usuario(id: $userID){
      id,
      nombre,
      apellido,
      correo,
      postulaciones {
        trabajo{
          id,
          titulo,
          descripcion,
          salario,
        }
        id,
        fecha,
      }
    }
  }
`;

export const GET_TRABAJO = gql`
  query getProduct($id: ID!){
    product(id: $id){
      id,
      titulo,
      descripcion,
      salario,
    }
  }
`;

export const LIST_PRODUCT = gql`
  query {
    listProducts {
      nombre
      sku
      precio
      descripcion
    }
  }
`;
