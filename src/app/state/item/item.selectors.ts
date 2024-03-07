//Selectors fetch data from the store and return it as an observable.

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemState } from "./item.model";

export const selectItemState = createFeatureSelector<ItemState>('book');
export const selectItemList = createSelector(selectItemState, (state) => state.items);
export const selectItemIsLoading = createSelector(selectItemState, (state) => state.isLoading);

