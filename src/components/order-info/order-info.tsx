import { OrderStatus } from '@components';
import { TIngredient } from '@utils-types';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredientState } from '../../services/slices/ingredients-slice';
import {
  getOrderByNumber,
  getOrderState
} from '../../services/slices/order-slice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../../shared/ui/preloader';
import styles from './order-info.module.css';

export const OrderInfo: FC = () => {
  const { getOrderByNumberResponse, request } = useSelector(getOrderState);
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);

  const { ingredients } = useSelector(getIngredientState);
  useEffect(() => {
    if (!isNaN(orderNumber)) {
      dispatch(getOrderByNumber(orderNumber));
    }
  }, [dispatch, orderNumber]);
  const orderInfo = useMemo(() => {
    if (!getOrderByNumberResponse || !ingredients.length) return null;

    const date = new Date(getOrderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = getOrderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...getOrderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [getOrderByNumberResponse, ingredients]);

  if (request || !orderInfo) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrap} data-cy='order-info'>
      <p
        className='text text_type_digits-default mb-10'
        style={{ textAlign: 'center' }}
      >
        #{String(orderInfo.number).padStart(6, '0')}
      </p>
      <h3 className={`text text_type_main-medium pb-3 ${styles.header}`}>
        {orderInfo.name}
      </h3>
      <OrderStatus status={orderInfo.status} />

      <p className={`text text_type_main-medium pt-15 pb-6`}>Ingredients:</p>
      <ul className={`${styles.list} mb-10 pr-6`}>
        {Object.values(orderInfo.ingredientsInfo).map((item) => (
          <li className={`pb-4 ${styles.item}`} key={item._id}>
            <div className={styles.img_wrap}>
              <div className={styles.border}>
                <img
                  className={styles.img}
                  src={item.image_mobile}
                  alt={item.name}
                />
              </div>
            </div>
            <span
              className={`text text_type_main-default pl-4 ${styles.ingredient_name}`}
            >
              {item.name}
            </span>
            <div className={styles.price_info}>
              <span className={`text text_type_digits-default pr-2`}>
                {item.count} x {item.price}
              </span>
              <CurrencyIcon type={'primary'} />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.bottom}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={orderInfo.date} />
        </p>
        <div className={styles.total_price}>
          <span className={`text text_type_digits-default pr-2`}>
            {orderInfo.total}
          </span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </div>
  );
};
