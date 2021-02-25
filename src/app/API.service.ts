/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateUserInput = {
  id?: string | null;
  userSub: string;
  name?: string | null;
  email: string;
  phone?: string | null;
};

export type ModelUserConditionInput = {
  userSub?: ModelIDInput | null;
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateUserInput = {
  id: string;
  userSub?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type DeleteUserInput = {
  id?: string | null;
};

export type CreateWarningSignInput = {
  id?: string | null;
  userID: string;
  title: string;
  description?: string | null;
};

export type ModelWarningSignConditionInput = {
  userID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelWarningSignConditionInput | null> | null;
  or?: Array<ModelWarningSignConditionInput | null> | null;
  not?: ModelWarningSignConditionInput | null;
};

export type UpdateWarningSignInput = {
  id: string;
  userID?: string | null;
  title?: string | null;
  description?: string | null;
};

export type DeleteWarningSignInput = {
  id?: string | null;
};

export type CreateCopingStrategyInput = {
  id?: string | null;
  userID: string;
  title: string;
  description?: string | null;
};

export type ModelCopingStrategyConditionInput = {
  userID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelCopingStrategyConditionInput | null> | null;
  or?: Array<ModelCopingStrategyConditionInput | null> | null;
  not?: ModelCopingStrategyConditionInput | null;
};

export type UpdateCopingStrategyInput = {
  id: string;
  userID?: string | null;
  title?: string | null;
  description?: string | null;
};

export type DeleteCopingStrategyInput = {
  id?: string | null;
};

export type CreateContactInput = {
  id?: string | null;
  userID: string;
  name?: string | null;
  automaticTextMessage: string;
  phone?: string | null;
};

export type ModelContactConditionInput = {
  userID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  automaticTextMessage?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  and?: Array<ModelContactConditionInput | null> | null;
  or?: Array<ModelContactConditionInput | null> | null;
  not?: ModelContactConditionInput | null;
};

export type UpdateContactInput = {
  id: string;
  userID?: string | null;
  name?: string | null;
  automaticTextMessage?: string | null;
  phone?: string | null;
};

export type DeleteContactInput = {
  id?: string | null;
};

export type CreatePlaceInput = {
  id?: string | null;
  userID: string;
  title: string;
  description?: string | null;
  address?: AddressInput | null;
};

export type AddressInput = {
  street?: string | null;
  city?: string | null;
  postalCode?: string | null;
  province?: string | null;
  country?: string | null;
};

export type ModelPlaceConditionInput = {
  userID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelPlaceConditionInput | null> | null;
  or?: Array<ModelPlaceConditionInput | null> | null;
  not?: ModelPlaceConditionInput | null;
};

export type UpdatePlaceInput = {
  id: string;
  userID?: string | null;
  title?: string | null;
  description?: string | null;
  address?: AddressInput | null;
};

export type DeletePlaceInput = {
  id?: string | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  userSub?: ModelIDInput | null;
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelWarningSignFilterInput = {
  id?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelWarningSignFilterInput | null> | null;
  or?: Array<ModelWarningSignFilterInput | null> | null;
  not?: ModelWarningSignFilterInput | null;
};

export type ModelCopingStrategyFilterInput = {
  id?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelCopingStrategyFilterInput | null> | null;
  or?: Array<ModelCopingStrategyFilterInput | null> | null;
  not?: ModelCopingStrategyFilterInput | null;
};

export type ModelContactFilterInput = {
  id?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  automaticTextMessage?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  and?: Array<ModelContactFilterInput | null> | null;
  or?: Array<ModelContactFilterInput | null> | null;
  not?: ModelContactFilterInput | null;
};

export type ModelPlaceFilterInput = {
  id?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelPlaceFilterInput | null> | null;
  or?: Array<ModelPlaceFilterInput | null> | null;
  not?: ModelPlaceFilterInput | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type CreateWarningSignMutation = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateWarningSignMutation = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteWarningSignMutation = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type CreateCopingStrategyMutation = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateCopingStrategyMutation = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteCopingStrategyMutation = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type CreateContactMutation = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateContactMutation = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteContactMutation = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type CreatePlaceMutation = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdatePlaceMutation = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeletePlaceMutation = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    userSub: string;
    name: string | null;
    email: string;
    phone: string | null;
    warningSigns: {
      __typename: "ModelWarningSignConnection";
      nextToken: string | null;
    } | null;
    copingStrategies: {
      __typename: "ModelCopingStrategyConnection";
      nextToken: string | null;
    } | null;
    contacts: {
      __typename: "ModelContactConnection";
      nextToken: string | null;
    } | null;
    places: {
      __typename: "ModelPlaceConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetWarningSignQuery = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListWarningSignsQuery = {
  __typename: "ModelWarningSignConnection";
  items: Array<{
    __typename: "WarningSign";
    id: string;
    userID: string;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetCopingStrategyQuery = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListCopingStrategysQuery = {
  __typename: "ModelCopingStrategyConnection";
  items: Array<{
    __typename: "CopingStrategy";
    id: string;
    userID: string;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetContactQuery = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListContactsQuery = {
  __typename: "ModelContactConnection";
  items: Array<{
    __typename: "Contact";
    id: string;
    userID: string;
    name: string | null;
    automaticTextMessage: string;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetPlaceQuery = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListPlacesQuery = {
  __typename: "ModelPlaceConnection";
  items: Array<{
    __typename: "Place";
    id: string;
    userID: string;
    title: string;
    description: string | null;
    address: {
      __typename: "Address";
      street: string | null;
      city: string | null;
      postalCode: string | null;
      province: string | null;
      country: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  userSub: string;
  name: string | null;
  email: string;
  phone: string | null;
  warningSigns: {
    __typename: "ModelWarningSignConnection";
    items: Array<{
      __typename: "WarningSign";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  copingStrategies: {
    __typename: "ModelCopingStrategyConnection";
    items: Array<{
      __typename: "CopingStrategy";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  contacts: {
    __typename: "ModelContactConnection";
    items: Array<{
      __typename: "Contact";
      id: string;
      userID: string;
      name: string | null;
      automaticTextMessage: string;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  places: {
    __typename: "ModelPlaceConnection";
    items: Array<{
      __typename: "Place";
      id: string;
      userID: string;
      title: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnCreateWarningSignSubscription = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateWarningSignSubscription = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteWarningSignSubscription = {
  __typename: "WarningSign";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnCreateCopingStrategySubscription = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateCopingStrategySubscription = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteCopingStrategySubscription = {
  __typename: "CopingStrategy";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnCreateContactSubscription = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateContactSubscription = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteContactSubscription = {
  __typename: "Contact";
  id: string;
  userID: string;
  name: string | null;
  automaticTextMessage: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnCreatePlaceSubscription = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdatePlaceSubscription = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeletePlaceSubscription = {
  __typename: "Place";
  id: string;
  userID: string;
  title: string;
  description: string | null;
  address: {
    __typename: "Address";
    street: string | null;
    city: string | null;
    postalCode: string | null;
    province: string | null;
    country: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CreateWarningSign(
    input: CreateWarningSignInput,
    condition?: ModelWarningSignConditionInput
  ): Promise<CreateWarningSignMutation> {
    const statement = `mutation CreateWarningSign($input: CreateWarningSignInput!, $condition: ModelWarningSignConditionInput) {
        createWarningSign(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateWarningSignMutation>response.data.createWarningSign;
  }
  async UpdateWarningSign(
    input: UpdateWarningSignInput,
    condition?: ModelWarningSignConditionInput
  ): Promise<UpdateWarningSignMutation> {
    const statement = `mutation UpdateWarningSign($input: UpdateWarningSignInput!, $condition: ModelWarningSignConditionInput) {
        updateWarningSign(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateWarningSignMutation>response.data.updateWarningSign;
  }
  async DeleteWarningSign(
    input: DeleteWarningSignInput,
    condition?: ModelWarningSignConditionInput
  ): Promise<DeleteWarningSignMutation> {
    const statement = `mutation DeleteWarningSign($input: DeleteWarningSignInput!, $condition: ModelWarningSignConditionInput) {
        deleteWarningSign(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteWarningSignMutation>response.data.deleteWarningSign;
  }
  async CreateCopingStrategy(
    input: CreateCopingStrategyInput,
    condition?: ModelCopingStrategyConditionInput
  ): Promise<CreateCopingStrategyMutation> {
    const statement = `mutation CreateCopingStrategy($input: CreateCopingStrategyInput!, $condition: ModelCopingStrategyConditionInput) {
        createCopingStrategy(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCopingStrategyMutation>response.data.createCopingStrategy;
  }
  async UpdateCopingStrategy(
    input: UpdateCopingStrategyInput,
    condition?: ModelCopingStrategyConditionInput
  ): Promise<UpdateCopingStrategyMutation> {
    const statement = `mutation UpdateCopingStrategy($input: UpdateCopingStrategyInput!, $condition: ModelCopingStrategyConditionInput) {
        updateCopingStrategy(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCopingStrategyMutation>response.data.updateCopingStrategy;
  }
  async DeleteCopingStrategy(
    input: DeleteCopingStrategyInput,
    condition?: ModelCopingStrategyConditionInput
  ): Promise<DeleteCopingStrategyMutation> {
    const statement = `mutation DeleteCopingStrategy($input: DeleteCopingStrategyInput!, $condition: ModelCopingStrategyConditionInput) {
        deleteCopingStrategy(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCopingStrategyMutation>response.data.deleteCopingStrategy;
  }
  async CreateContact(
    input: CreateContactInput,
    condition?: ModelContactConditionInput
  ): Promise<CreateContactMutation> {
    const statement = `mutation CreateContact($input: CreateContactInput!, $condition: ModelContactConditionInput) {
        createContact(input: $input, condition: $condition) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateContactMutation>response.data.createContact;
  }
  async UpdateContact(
    input: UpdateContactInput,
    condition?: ModelContactConditionInput
  ): Promise<UpdateContactMutation> {
    const statement = `mutation UpdateContact($input: UpdateContactInput!, $condition: ModelContactConditionInput) {
        updateContact(input: $input, condition: $condition) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateContactMutation>response.data.updateContact;
  }
  async DeleteContact(
    input: DeleteContactInput,
    condition?: ModelContactConditionInput
  ): Promise<DeleteContactMutation> {
    const statement = `mutation DeleteContact($input: DeleteContactInput!, $condition: ModelContactConditionInput) {
        deleteContact(input: $input, condition: $condition) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteContactMutation>response.data.deleteContact;
  }
  async CreatePlace(
    input: CreatePlaceInput,
    condition?: ModelPlaceConditionInput
  ): Promise<CreatePlaceMutation> {
    const statement = `mutation CreatePlace($input: CreatePlaceInput!, $condition: ModelPlaceConditionInput) {
        createPlace(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePlaceMutation>response.data.createPlace;
  }
  async UpdatePlace(
    input: UpdatePlaceInput,
    condition?: ModelPlaceConditionInput
  ): Promise<UpdatePlaceMutation> {
    const statement = `mutation UpdatePlace($input: UpdatePlaceInput!, $condition: ModelPlaceConditionInput) {
        updatePlace(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePlaceMutation>response.data.updatePlace;
  }
  async DeletePlace(
    input: DeletePlaceInput,
    condition?: ModelPlaceConditionInput
  ): Promise<DeletePlaceMutation> {
    const statement = `mutation DeletePlace($input: DeletePlaceInput!, $condition: ModelPlaceConditionInput) {
        deletePlace(input: $input, condition: $condition) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePlaceMutation>response.data.deletePlace;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userSub
            name
            email
            phone
            warningSigns {
              __typename
              nextToken
            }
            copingStrategies {
              __typename
              nextToken
            }
            contacts {
              __typename
              nextToken
            }
            places {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async GetWarningSign(id: string): Promise<GetWarningSignQuery> {
    const statement = `query GetWarningSign($id: ID!) {
        getWarningSign(id: $id) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetWarningSignQuery>response.data.getWarningSign;
  }
  async ListWarningSigns(
    filter?: ModelWarningSignFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListWarningSignsQuery> {
    const statement = `query ListWarningSigns($filter: ModelWarningSignFilterInput, $limit: Int, $nextToken: String) {
        listWarningSigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userID
            title
            description
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListWarningSignsQuery>response.data.listWarningSigns;
  }
  async GetCopingStrategy(id: string): Promise<GetCopingStrategyQuery> {
    const statement = `query GetCopingStrategy($id: ID!) {
        getCopingStrategy(id: $id) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCopingStrategyQuery>response.data.getCopingStrategy;
  }
  async ListCopingStrategys(
    filter?: ModelCopingStrategyFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCopingStrategysQuery> {
    const statement = `query ListCopingStrategys($filter: ModelCopingStrategyFilterInput, $limit: Int, $nextToken: String) {
        listCopingStrategys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userID
            title
            description
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCopingStrategysQuery>response.data.listCopingStrategys;
  }
  async GetContact(id: string): Promise<GetContactQuery> {
    const statement = `query GetContact($id: ID!) {
        getContact(id: $id) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetContactQuery>response.data.getContact;
  }
  async ListContacts(
    filter?: ModelContactFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListContactsQuery> {
    const statement = `query ListContacts($filter: ModelContactFilterInput, $limit: Int, $nextToken: String) {
        listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userID
            name
            automaticTextMessage
            phone
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListContactsQuery>response.data.listContacts;
  }
  async GetPlace(id: string): Promise<GetPlaceQuery> {
    const statement = `query GetPlace($id: ID!) {
        getPlace(id: $id) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPlaceQuery>response.data.getPlace;
  }
  async ListPlaces(
    filter?: ModelPlaceFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPlacesQuery> {
    const statement = `query ListPlaces($filter: ModelPlaceFilterInput, $limit: Int, $nextToken: String) {
        listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userID
            title
            description
            address {
              __typename
              street
              city
              postalCode
              province
              country
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPlacesQuery>response.data.listPlaces;
  }
  OnCreateUserListener: Observable<
    SubscriptionResponse<OnCreateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($owner: String!) {
        onCreateUser(owner: $owner) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserSubscription>>;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<OnUpdateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($owner: String!) {
        onUpdateUser(owner: $owner) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserSubscription>>;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<OnDeleteUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($owner: String!) {
        onDeleteUser(owner: $owner) {
          __typename
          id
          userSub
          name
          email
          phone
          warningSigns {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          copingStrategies {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          contacts {
            __typename
            items {
              __typename
              id
              userID
              name
              automaticTextMessage
              phone
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          places {
            __typename
            items {
              __typename
              id
              userID
              title
              description
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserSubscription>>;

  OnCreateWarningSignListener: Observable<
    SubscriptionResponse<OnCreateWarningSignSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateWarningSign($owner: String!) {
        onCreateWarningSign(owner: $owner) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateWarningSignSubscription>>;

  OnUpdateWarningSignListener: Observable<
    SubscriptionResponse<OnUpdateWarningSignSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateWarningSign($owner: String!) {
        onUpdateWarningSign(owner: $owner) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateWarningSignSubscription>>;

  OnDeleteWarningSignListener: Observable<
    SubscriptionResponse<OnDeleteWarningSignSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteWarningSign($owner: String!) {
        onDeleteWarningSign(owner: $owner) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteWarningSignSubscription>>;

  OnCreateCopingStrategyListener: Observable<
    SubscriptionResponse<OnCreateCopingStrategySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCopingStrategy($owner: String!) {
        onCreateCopingStrategy(owner: $owner) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateCopingStrategySubscription>>;

  OnUpdateCopingStrategyListener: Observable<
    SubscriptionResponse<OnUpdateCopingStrategySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCopingStrategy($owner: String!) {
        onUpdateCopingStrategy(owner: $owner) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateCopingStrategySubscription>>;

  OnDeleteCopingStrategyListener: Observable<
    SubscriptionResponse<OnDeleteCopingStrategySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCopingStrategy($owner: String!) {
        onDeleteCopingStrategy(owner: $owner) {
          __typename
          id
          userID
          title
          description
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCopingStrategySubscription>>;

  OnCreateContactListener: Observable<
    SubscriptionResponse<OnCreateContactSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateContact($owner: String!) {
        onCreateContact(owner: $owner) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateContactSubscription>>;

  OnUpdateContactListener: Observable<
    SubscriptionResponse<OnUpdateContactSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateContact($owner: String!) {
        onUpdateContact(owner: $owner) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateContactSubscription>>;

  OnDeleteContactListener: Observable<
    SubscriptionResponse<OnDeleteContactSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteContact($owner: String!) {
        onDeleteContact(owner: $owner) {
          __typename
          id
          userID
          name
          automaticTextMessage
          phone
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteContactSubscription>>;

  OnCreatePlaceListener: Observable<
    SubscriptionResponse<OnCreatePlaceSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePlace($owner: String!) {
        onCreatePlace(owner: $owner) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreatePlaceSubscription>>;

  OnUpdatePlaceListener: Observable<
    SubscriptionResponse<OnUpdatePlaceSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePlace($owner: String!) {
        onUpdatePlace(owner: $owner) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdatePlaceSubscription>>;

  OnDeletePlaceListener: Observable<
    SubscriptionResponse<OnDeletePlaceSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePlace($owner: String!) {
        onDeletePlace(owner: $owner) {
          __typename
          id
          userID
          title
          description
          address {
            __typename
            street
            city
            postalCode
            province
            country
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeletePlaceSubscription>>;
}
