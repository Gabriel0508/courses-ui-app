//This will hold the interface of items store.
import { Item } from 'src/app/core/models/item.model';

export interface ItemState {
  items: Item[];
  isLoading: boolean;
}
