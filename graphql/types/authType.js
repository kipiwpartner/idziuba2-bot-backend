import { GraphQLObjectType, GraphQLString } from 'graphql'

export const loginType = new GraphQLObjectType({
    name: 'Login',
    fields: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
  });

  export const loginSuccessType = new GraphQLObjectType({
    name: 'LoginSuccess',
    fields: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
  });