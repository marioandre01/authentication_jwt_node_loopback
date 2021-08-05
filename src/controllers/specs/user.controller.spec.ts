import {RequestBodyObject, SchemaObject} from '@loopback/rest';

export const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody: RequestBodyObject = {
  description: 'The input of login function - password must be at least 8 characters',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
}

