// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, WarningSign, CopingStrategy, Contact, Place, Address } = initSchema(schema);

export {
  User,
  WarningSign,
  CopingStrategy,
  Contact,
  Place,
  Address
};