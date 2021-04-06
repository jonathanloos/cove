import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Address {
  readonly street?: string;
  readonly city?: string;
  readonly postalCode?: string;
  readonly province?: string;
  readonly country?: string;
  constructor(init: ModelInit<Address>);
}

export declare class ResourceContactInformation {
  readonly number?: string;
  readonly hoursOfOperation?: string;
  constructor(init: ModelInit<ResourceContactInformation>);
}

export declare class User {
  readonly id: string;
  readonly userSub: string;
  readonly name?: string;
  readonly email: string;
  readonly phone?: string;
  readonly warningSigns?: (WarningSign | null)[];
  readonly copingStrategies?: (CopingStrategy | null)[];
  readonly contacts?: (Contact | null)[];
  readonly places?: (Place | null)[];
  readonly favouriteResources?: (FavouriteUserResources | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class WarningSign {
  readonly id: string;
  readonly userID: string;
  readonly title: string;
  readonly description?: string;
  constructor(init: ModelInit<WarningSign>);
  static copyOf(source: WarningSign, mutator: (draft: MutableModel<WarningSign>) => MutableModel<WarningSign> | void): WarningSign;
}

export declare class CopingStrategy {
  readonly id: string;
  readonly userID: string;
  readonly title: string;
  readonly description?: string;
  constructor(init: ModelInit<CopingStrategy>);
  static copyOf(source: CopingStrategy, mutator: (draft: MutableModel<CopingStrategy>) => MutableModel<CopingStrategy> | void): CopingStrategy;
}

export declare class Contact {
  readonly id: string;
  readonly userID: string;
  readonly name?: string;
  readonly automaticTextMessage: string;
  readonly phone?: string;
  constructor(init: ModelInit<Contact>);
  static copyOf(source: Contact, mutator: (draft: MutableModel<Contact>) => MutableModel<Contact> | void): Contact;
}

export declare class Place {
  readonly id: string;
  readonly userID: string;
  readonly title: string;
  readonly description?: string;
  readonly address?: Address;
  constructor(init: ModelInit<Place>);
  static copyOf(source: Place, mutator: (draft: MutableModel<Place>) => MutableModel<Place> | void): Place;
}

export declare class FavouriteUserResources {
  readonly id: string;
  readonly resource: HelpResource;
  readonly user: User;
  constructor(init: ModelInit<FavouriteUserResources>);
  static copyOf(source: FavouriteUserResources, mutator: (draft: MutableModel<FavouriteUserResources>) => MutableModel<FavouriteUserResources> | void): FavouriteUserResources;
}

export declare class HelpResource {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly phone?: ResourceContactInformation;
  readonly sms?: ResourceContactInformation;
  readonly live_chat?: boolean;
  readonly img_url?: string;
  readonly url?: string;
  readonly userFavourites?: (FavouriteUserResources | null)[];
  constructor(init: ModelInit<HelpResource>);
  static copyOf(source: HelpResource, mutator: (draft: MutableModel<HelpResource>) => MutableModel<HelpResource> | void): HelpResource;
}