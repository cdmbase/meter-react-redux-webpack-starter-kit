import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';

const resolvers = {
  Query: {
    user(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return context.user;
      }
    },
    async users(root, args) {
      return await Meteor.users.find().fetch();
    },
  },
  User: {
    emails: ({ emails }) => emails,
    randomString: () => Random.id(),
  },
};

export default resolvers;
