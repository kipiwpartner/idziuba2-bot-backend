import { GraphQLObjectType, GraphQLString } from 'graphql'

export const roleType = new GraphQLObjectType({
    name: 'roleType',
    fields: {
      name: { type: GraphQLString }
    },
  })