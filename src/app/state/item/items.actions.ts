//This file will hold all the actions we need to implement the basic CRUD operations.

import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.model';

const prefix = '[Items]';

export const getItems = createAction(`${prefix} Get Items`);

export const getItemsSuccess = createAction(
  `${getItems.type} Success`,
  props<{
    items: Item[];
  }>()
);

export const createItem = createAction(
  `${prefix} Create Item`,
  props<{
    item: Item;
  }>()
);

export const createItemSuccess = createAction(
  `${createItem.type} Success`,
  props<{
    item: Item;
  }>()
);

export const deleteItem = createAction(
  `${prefix} Delete Item`,
  props<{
    item: Item;
  }>()
);

export const deleteItemSuccess = createAction(
  `${deleteItem.type} Success`,
  props<{
    item: Item;
  }>()
);
