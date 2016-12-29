import gql from 'graphql-tag';

const WORKSPACE_LIST = gql`
  query workspace {
    workspace{
      _id
      name
      lang
      creator
      completed
      server {
        name
        status
      }
      info {
        container
        ports {
          socket
          application
        }
      }
      workspace
      status
    }
  }
`;

const CREATE_WORKSPACE = gql`
  mutation addWorkspace($name: String!, $lang: String!, $description: String){
    addWorkspace(name: $name, lang: $lang, description: $description, status: STATUS_SHUTDOWN) {
      _id
      name
      lang
      creator
      completed
      server {
        name
        status
      }
      info {
        container
        ports {
          socket
          application
        }
      }
      workspace
      status
    }
  }
`;

export { WORKSPACE_LIST, CREATE_WORKSPACE };
