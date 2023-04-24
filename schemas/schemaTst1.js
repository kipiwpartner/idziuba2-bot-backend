import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { personType } from '../graphql/types/personType.js';

const people = [
    { name: 'Alice', age: 25, email: 'alice@example.com', address: '456 Oak St.' },
    { name: 'Bob', age: 35, email: 'bob@example.com', address: '789 Elm St.' },
    { name: 'Charlie', age: 40, email: 'charlie@example.com', address: '234 Pine St.' }
  ]

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   person: String
 * }
 */
export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        person: {
          type: new GraphQLObjectType({
            name: 'Person',
            fields: {
              name: { type: GraphQLString },
              age: { type: GraphQLInt },
              email: { type: GraphQLString },
              address: { type: GraphQLString },
            },
          }),
          resolve: () => {
            // This resolver returns a single Person object.
            return people[0];
          },
        },
        people: {
          type: new GraphQLList(new GraphQLObjectType({
            name: 'People',
            fields: {
              name: { type: GraphQLString },
              age: { type: GraphQLInt },
              email: { type: GraphQLString },
              address: { type: GraphQLString },
            },
          })),
          args: {
            // This query accepts an optional "filter" argument of type String.
            name: { type: GraphQLString }
          },
          resolve: (parent, args) => {
            console.log(parent)
            console.log(args)
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