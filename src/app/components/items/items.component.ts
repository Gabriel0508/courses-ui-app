import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import * as fromItems from '../../state/item/index';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  items$: Observable<Item[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  createItem: FormGroup = new FormGroup({});

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.iniFormItem();
    this.initDispatch();
    this.initSubscriptions();
  }

  onCreateItem(): void {
    if (this.createItem.valid) {
      this.store.dispatch(
        fromItems.createItem({
          item: {
            id: this.createItem.controls['id'].value,
            name: this.createItem.controls['name'].value,
            description: this.createItem.controls['description'].value,
            price: this.createItem.controls['price'].value,
          },
        })
      );
    }
  }

  onDeleteItem(item: Item): void {
    this.store.dispatch(fromItems.deleteItem({ item }));
  }

  private initDispatch(): void {
    this.store.dispatch(fromItems.getItems());
  }

  private initSubscriptions(): void {
    this.items$ = this.store.pipe(select(fromItems.selectItemList));
    this.isLoading$ = this.store.pipe(select(fromItems.selectItemIsLoading));
  }

  private iniFormItem() {
    this.createItem = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
    });
  }
}
