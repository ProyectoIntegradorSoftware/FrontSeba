import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
mutation LoginUser($input: LoginUserInput!) {
  loginUser(loginUserInput: $input) {
    token
    user {
      id
      nombre
      apellido
      correo
    }
  }
}

`;

export const REGISTER_MUTATION = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    nombre
    apellido
    correo
  }
}
`;

export const POSTULAR_MUTATION = gql`
  mutation Postular($input: CrearPostulacionInput!) {
    postularAtrabajo(input: $input) {
      id
      fecha
      usuario {
        id
        nombre
        correo
      }
      trabajo {
        id
        titulo
        descripcion
        salario
      }
    }
  }
`;

export const ELIMINAR_POSTULACION_MUTATION = gql`
  mutation EliminarPostulacion($id: ID!) {
    eliminarPostulacion(id: $id) {
      mensaje
      codigoEstadoHTTP
    }
  }
`;

export const ACTUALIZAR_USUARIO_MUTATION = gql`
  mutation ActualizarUsuario($id: ID!, $input: ActualizarUsuarioInput) {
    actualizarUsuario(id: $id, input: $input) {
      id
      nombre
      apellido
      correo
    }
  }
`;

export const CREAR_TRABAJO = gql`
  mutation CrearTrabajo($input: CrearTrabajoInput!) {
    crearTrabajo(input: $input) {
      id
      titulo
      descripcion
      salario

    }
  }
`;
export const ACTUALIZAR_TRABAJO = gql`
  mutation ActualizarTrabajo($id: ID!, $input: ActualizarTrabajoInput!) {
    actualizarTrabajo(id: $id, input: $input) {
      titulo
      descripcion
      salario
    }
  }
`;
