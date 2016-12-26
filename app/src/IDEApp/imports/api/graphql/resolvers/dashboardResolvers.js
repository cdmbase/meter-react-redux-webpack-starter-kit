import { Boxes, Servers } from '../../collections';
import { pubsub } from '../../../../../subscriptions';
import { kebabCase } from 'lodash';

const dashboardResolvers = Object.assign({},
  {
    Query: {
       async workspace(root, args, context) {
        return  await Boxes.find().fetch();
      },
       async server(root, args, context) {
        return await Servers.findOne(args.id);
      },
    },
    Subscription: {
      workspaceAdded(workspace) {
        // the subscription payload is the comment.
        return workspace;
      },
    },
    Workspace: {
       server({ server }) {
        return  Servers.findOne(server);
      },
    },
    Mutation: {
      async addWorkspace(root, { name, description, lang }, context) {
        if (!context.userId) {
          throw new Meteor.Error('Must be logged into add a workspace');
        }
        const id = Boxes.insert({
          name,
          description,
          lang,
          creator: context.userId || 'guest',
          completed: false,
          server: Servers.findOne()._id,
          info: {},
          workspace: kebabCase(name),
          status: Boxes.consts.STATUS_SHUTDOWN,
        });
        const workspace = Boxes.findOne(id);
        pubsub.publish('workspaceAdded', workspace);
        return await workspace;
      },
    },
  },
);

export default dashboardResolvers;
