import { Boxes, Servers } from '../collections';


const dashboardResolvers = Object.assign({},
  {
    Query: {
      workspace(root, args, context) {
        return Boxes.findAll();
      },
      server(root, args, context) {
        return Servers.findOne(args.id);
      },
    },
  },
);

export default dashboardResolvers;
