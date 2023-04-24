import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { personType } from '../types/personType.js'
import { people } from '../db.js';

  export const personSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        person: {
          type: personType,
          resolve: () => {
            return people[0];
          },
        },
      },
    }),
  });

