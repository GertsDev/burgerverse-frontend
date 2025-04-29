import { BurgerConstructorElement } from '@components';
import { OrderDetails } from '@components/order-details';
import { Modal, Preloader } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  getBurgerState
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  getOrderState,
  placeOrder
} from '../../services/slices/order-slice';
import { getUserState } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import styles from './burger-constructor.module.css';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(getUserState);
  const constructorItems = useSelector(getBurgerState);
  const { order, loading: orderRequest, error } = useSelector(getOrderState);
  const { bun, ingredients } = constructorItems;

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(placeOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  useEffect(() => {
    if (order && !orderRequest && !error) {
      dispatch(clearConstructor());
    }
  }, [order, orderRequest, error, dispatch]);

  return (
    <section className={styles.burger_constructor} data-cy='constructor'>
      {bun ? (
        <div className={`${styles.element} mb-4 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked
            text={`${bun.name} (up)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Choose Your Buns
        </div>
      )}
      <ul className={styles.elements}>
        {ingredients.length > 0 ? (
          ingredients.map((item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={ingredients.length}
              key={item.id}
            />
          ))
        ) : (
          <div
            className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Add Your Fillings
          </div>
        )}
      </ul>
      {bun ? (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${bun.name} (down)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Choose Your Buns
        </div>
      )}
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          children='Launch Your Order'
          onClick={onOrderClick}
          disabled={!bun || orderRequest}
          data-cy='order-button'
        />
      </div>

      {orderRequest && !order && (
        <Modal
          onClose={closeOrderModal}
          title={'Preparing Your Cosmic Order...'}
        >
          <Preloader />
        </Modal>
      )}

      {order && !orderRequest && (
        <Modal onClose={closeOrderModal} title={''}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </section>
  );
};
