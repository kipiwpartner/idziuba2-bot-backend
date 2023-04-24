import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { personType } from '../types/personType.js'
import { people } from '../db.js';

  export const peopleSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        people: {
          type: new GraphQLList(personType),
          args: {
            name: { type: GraphQLString },
          },
          resolve: (parent, args, context) => {
            //console.log(parent);
            console.log(args);
            console.log(context);
            // This resolver returns the entire people array.
            // If a filter argument is provided, it filters the array by name.
            // if (args.filter) {
            //   return people.filter(person => person.name.includes(args.filter));
            // }
            return people;
          },
        },
      },
    }),
  });

