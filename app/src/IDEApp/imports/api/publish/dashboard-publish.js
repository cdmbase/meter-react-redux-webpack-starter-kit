import { Meteor } from 'meteor/meteor';
import { Boxes, Servers } from '../collections';

// Meteor.publish('boxes.list', () => {
//   return Boxes.find({})
// });

Meteor.publish('servers.list', () => Servers.find());

Meteor.publishComposite('boxes.list', function() {
  if(!this.userId) return;
  return {
    find: function() {
      return Boxes.find({creator: this.userId});
    },
    children: [
      {
        find: function(box) {
          return Servers.find({ _id: box.server });
        },
      },

    ],
  };
});
