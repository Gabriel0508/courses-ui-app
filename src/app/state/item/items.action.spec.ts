import * as fromItems from './index';
import { itemsListMock } from './items.mock';

describe('ItemsActions', () => {
  describe('GetItems', () => {
    it('should create an action to get items', () => {
      const expectedAction = {
        type: fromItems.getItems.type,
      };
      const action = fromItems.getItems();
      expect(action).toEqual(expectedAction);
    });
  });

  it('should create an action to get items successfully', () => {
    const expectedAction = {
        type: fromItems.getItemsSuccess.type,
        items: itemsListMock
    };

    const action = fromItems.getItemsSuccess({
        items: itemsListMock
    });
    expect(action).toEqual(expectedAction);
  });

//   it('should create an action to create an item', () => {
//     const expectedAction = {
//         type: fromItems.createItem.type,
//     };

//     const action = fromItems.createItem({
//         item: itemsListMock
//     });
//     expect(action).toEqual(expectedAction);
//   });
});
