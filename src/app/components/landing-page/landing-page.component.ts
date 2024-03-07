import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import * as fromItems from '../../state/item/index';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  items$: Observable<Item[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  createItem: FormGroup = new FormGroup({});

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
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
}
