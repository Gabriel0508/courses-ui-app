import { Action, createReducer, on } from '@ngrx/store';
import { ItemState } from './item.model';
import * as fromItems from './index';

export const initialItemsState: ItemState = {
  items: [],
  isLoading: false,
};

const reducer = createReducer<ItemState>(
  initialItemsState,
  on(fromItems.getItems, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(fromItems.getItemsSuccess, (state, { items }) => {
    return {
      ...state,
      isLoading: false,
      items,
    };
  }),

  on(fromItems.createItem, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(fromItems.createItemSuccess, (state, { item }) => {
    return {
      ...state,
      items: [...state.items, item],
      isLoading: false,
    };
  }),

  on(fromItems.deleteItem, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(fromItems.deleteItemSuccess, (state, { item }) => {
    return {
      ...state,
      isLoading: false,
      items: state.items.filter((it) => it.id !== item.id),
    };
  })
);

export function itemsReducers(state = initialItemsState, actions: Action): ItemState {
    return reducer(state, actions);
}
