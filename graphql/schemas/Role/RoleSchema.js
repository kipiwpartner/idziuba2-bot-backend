import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { roleType } from '#types/roleType.js'
import Role from "#models/Role.js"

export const getAllRolesSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        getAllRoles: {
          type: new GraphQLList(roleType),
          resolve: async () => {
            return await Role.find();
          },
        },
      },
    }),
})

export const getRoleByNameSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        getRoleByName: {
          type: roleType,
          args: {
            name: { type: GraphQLString },
          },
          resolve: async (parent, args) => {
            return await Role.findOne({name: args?.name});
          },
        },
      },
    }),
})