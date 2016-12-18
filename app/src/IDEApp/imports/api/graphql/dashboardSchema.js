
export  const typeDefs = [`
type ports {
  socket: Int,
  application: Int,
}

type info {
  container: String,
  ports: Ports
}

type Server {
  name: String,
  url: String,
  status: String
 
}
type Workspace {
  _id: String,
  name: String,
  lang: String,
  creator: String,
  completed: String,
  server: Server,
  info: info,
  workspace: String,
  status: String
}

type Query {
  workspace: [Workspace]
}

schema {
  query: Query
}
`];

