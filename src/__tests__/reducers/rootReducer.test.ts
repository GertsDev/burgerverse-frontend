import {
  burgerConstructorInitialState,
  feedInitialState,
  ingredientsInitialState,
  orderInitialState,
  rootReducer,
  userInitialState,
  userOrdersInitialState
} from '../../shared/utils/jest-utils';

describe('rootReducer', () => {
  it('should initialize with the correct default state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.ingredients).toEqual(ingredientsInitialState);
    expect(state.burgerConstructor).toEqual(burgerConstructorInitialState);
    expect(state.order).toEqual(orderInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.user).toEqual(userInitialState);
    expect(state.userOrders).toEqual(userOrdersInitialState);
  });
});
