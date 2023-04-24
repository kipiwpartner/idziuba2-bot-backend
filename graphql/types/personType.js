import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

export const personType = new GraphQLObjectType({
    name: 'Person',
    fields: {
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      email: { type: GraphQLString },
      address: { type: GraphQLString },
    },
  });