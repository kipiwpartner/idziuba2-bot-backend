import { mergeSchemas } from '@graphql-tools/schema';

/* RoleSchema */
import { getAllRolesSchema, getRoleByNameSchema} from '#schemas/Role/RoleSchema.js';

export const adminSchema = mergeSchemas({
      schemas: [
        //RoleSchema
          getAllRolesSchema,
          getRoleByNameSchema
      ]
  })