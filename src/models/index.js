// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, WarningSign, CopingStrategy, Contact, Place, FavouriteUserResources, HelpResource, Address, ResourceContactInformation } = initSchema(schema);

export {
  User,
  WarningSign,
  CopingStrategy,
  Contact,
  Place,
  FavouriteUserResources,
  HelpResource,
  Address,
  ResourceContactInformation
};