import { mergeSchemas } from '@graphql-tools/schema';
import { personSchema } from './schemas/personShema.js'
import { peopleSchema } from './schemas/peopleSchema.js';

export const schema = mergeSchemas({
    schemas: [
        personSchema,
        peopleSchema
    ],
  });
  
  export default schema;

//   import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
//   import { makeExecutableSchema } from '@graphql-tools/schema';
//   import { personSchema } from './schemas/personShema.js';
  
//   const mergedTypeDefs = mergeTypeDefs([personSchema.typeDefs,]);
//   const mergedResolvers = mergeResolvers([personSchema.resolvers]);
  
//   export const schema = makeExecutableSchema({
//     typeDefs: mergedTypeDefs,
//     resolvers: mergedResolvers,
//   });