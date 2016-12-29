import { models } from '../connectors/models';
import { pubsub } from '../../../../../graphql/subscriptions';
import { kebabCase } from 'lodash';
import { Boxes as BoxesConnector, Servers as ServersConnector } from '../../collections';
import IOClient from '../../io-client';
import logger from 'cdm-logger';
import { GraphQLURL, GraphQLDateTime } from 'graphql-custom-types';

export const dashboardResolvers = {
  Query: {
    workspace(root, args, context) {
      return context.Boxes.find();
    },
    server(root, args, context) {
      return context.Servers.findOne(args.id);
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
      return models.Servers.findOne(server);
    },
  },
  Url: GraphQLURL,
  Date: GraphQLDateTime,
  Mutation: {
    addWorkspace(root, { name, description, lang, status = 'STATUS_SHUTDOWN' }, context) {
      if (!context.userId) {
        throw new Meteor.Error('Must be logged into add a workspace');
      }
      const serverId = context.Servers.findOne()._id;
      const workspace = context.Boxes.insert({
        name,
        description,
        lang,
        creator: context.userId || 'guest',
        completed: false,
        server: serverId,
        info: {},
        workspace: kebabCase(name),
        status,
      });
      pubsub.publish('workspaceAdded', workspace);
      // IOClient.emit('msg', {
      //   target: `ws.${workspace.server}`,
      //   payload: { type: 'WS_CREATE',
      //     workspace: workspace.workspace || workspace._id,
      //   },
      // });
      return workspace;
    },
  },
};

