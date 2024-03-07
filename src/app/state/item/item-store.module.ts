import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ItemsEffects } from './item.effects';
import { itemsReducers } from './item.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('book', itemsReducers),
        EffectsModule.forFeature([ItemsEffects])
    ]
})
export class ItemStoreModule {}