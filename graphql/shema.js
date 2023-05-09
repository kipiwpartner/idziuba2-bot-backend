import { mergeSchemas } from '@graphql-tools/schema';
import { personSchema } from './schemas/personShema.js'
import { peopleSchema } from '#schemas/peopleSchema.js';
import { getAllRolesSchema, getRoleByNameSchema} from '#schemas/Role/getters.js';

// export const testSchema = mergeSchemas({
//     schemas: [
//         personSchema,
//         peopleSchema,
//         getAllRolesSchema,
//         getRoleByIdSchema
//     ],
//   })


export const adminSchema = mergeSchemas({
      schemas: [
        //Role
          getAllRolesSchema,
          getRoleByNameSchema
      ],
  })