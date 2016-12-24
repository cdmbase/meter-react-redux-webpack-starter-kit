import { Boxes, Servers } from '../../collections';


const dashboardResolvers = Object.assign({},
  {
    Query: {
      workspace(root, args, context) {
        return Boxes.find().fetch();
      },
      server(root, args, context) {
        return Servers.findOne(args.id);
      },
    },
    Workspace: {
      server({ server }) {
        return Servers.findOne(server);
      },
    },
  },
);

export default dashboardResolvers;
