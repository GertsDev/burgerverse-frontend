import { OrderStatus } from '@components';
import { TIngredient, TOrder } from '@utils-types';
import { CurrencyIcon } from '@zlden/react-developer-burger-ui-components';
import { FC, memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatDate } from 'utils/format-date';
import { getIngredientState } from '../../services/slices/ingredients-slice';
import { useSelector } from '../../services/store';
import styles from './order-card.module.css';

interface OrderCardProps {
  order: TOrder;
}

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const { ingredients } = useSelector(getIngredientState);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce<TIngredient[]>(
      (acc, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          return [...acc, ingredient];
        }
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  const locationState = { background: location };

  if (!orderInfo) return null;

  return (
    <Link
      to={orderInfo.number.toString()}
      relative='path'
      state={locationState}
      className={`p-6 mb-4 mr-2 ${styles.order}`}
      data-cy={`order-card-${orderInfo.number}`}
    >
      <div className={styles.order_info}>
        <span className={`text text_type_digits-default ${styles.number}`}>
          Order #{String(orderInfo.number).padStart(6, '0')}
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          {formatDate(orderInfo.date)}
        </span>
      </div>
      <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
        {orderInfo.name}
      </h4>
      {location.pathname === '/profile/orders' && (
        <OrderStatus status={orderInfo.status} />
      )}
      <div className={`pt-6 ${styles.order_content}`}>
        <ul className={styles.ingredients}>
          {orderInfo.ingredientsToShow.map((ingredient, index) => {
            const zIndex = maxIngredients - index;
            const right = 20 * index;
            return (
              <li
                className={styles.img_wrap}
                style={{ zIndex: zIndex, right: right }}
                key={ingredient._id + index}
              >
                <img
                  style={{
                    opacity:
                      orderInfo.remains > 0 && maxIngredients === index + 1
                        ? '0.5'
                        : '1'
                  }}
                  className={styles.img}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                {maxIngredients === index + 1 && orderInfo.remains > 0 && (
                  <span
                    className={`text text_type_digits-default ${styles.remains}`}
                  >
                    +{orderInfo.remains}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <div>
          <span
            className={`text text_type_digits-default pr-1 ${styles.order_total}`}
          >
            {orderInfo.total}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
});
