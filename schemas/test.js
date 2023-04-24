import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { personType } from '../graphql/types/personType.js';

const people = [
    { name: 'Alice', age: 25, email: 'alice@example.com', address: '456 Oak St.' },
    { name: 'Bob', age: 35, email: 'bob@example.com', address: '789 Elm St.' },
    { name: 'Charlie', age: 40, email: 'charlie@example.com', address: '234 Pine St.' }
  ]

  export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        person: {
          type: personType,
          resolve: () => {
            return people[0];
          },
        },
        people: {
          type: new GraphQLList(personType),
          args: {
            name: { type: GraphQLString },
          },
          resolve: (parent, args) => {
            console.log(parent);
            console.log(args);
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

