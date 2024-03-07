//Here we will manage all side effects from action dispatching.
//In our case we will be calling the books service to manipulate the data.

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemService } from 'src/app/core/services/item.service';
import * as fromItems from './index';
import { map, switchMap } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';

@Injectable()
export class ItemsEffects {
  constructor(
    private readonly action$: Actions,
    private readonly itemService: ItemService
  ) {}

  getItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromItems.getItems.type),
      switchMap(() => this.itemService.getItems()),
      map((items: Item[]) => fromItems.getItemsSuccess({ items }))
    )
  );

  createItem$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromItems.createItem),
      switchMap(({ item }) => this.itemService.createItem(item)),
      map((item: Item) => fromItems.createItemSuccess({ item }))
    )
  );

  deleteItem$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromItems.deleteItem),
      switchMap(({ item }) => this.itemService.deleteItem(item)),
      map((item: Item) => fromItems.deleteItemSuccess({ item }))
    )
  );
}
