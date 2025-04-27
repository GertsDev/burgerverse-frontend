import { Tab } from '@zlden/react-developer-burger-ui-components';
import { FC, memo } from 'react';

import { IngredientsCategory } from '@components';
import styles from './burger-ingredientsUI.module.css';
import { BurgerIngredientsUIProps } from './type';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab value='bun' active={currentTab === 'bun'} onClick={onTabClick}>
              Buns
            </Tab>
            <Tab
              value='main'
              active={currentTab === 'main'}
              onClick={onTabClick}
            >
              Fillings
            </Tab>
            <Tab
              value='sauce'
              active={currentTab === 'sauce'}
              onClick={onTabClick}
            >
              Sauces
            </Tab>
          </ul>
        </nav>
        <div className={styles.content}>
          <IngredientsCategory
            title='Stellar Buns'
            titleRef={titleBunRef}
            ingredients={buns}
            ref={bunsRef}
          />
          <IngredientsCategory
            title='Cosmic Fillings'
            titleRef={titleMainRef}
            ingredients={mains}
            ref={mainsRef}
          />
          <IngredientsCategory
            title='Space Sauces'
            titleRef={titleSaucesRef}
            ingredients={sauces}
            ref={saucesRef}
          />
        </div>
      </section>
    </>
  )
);
