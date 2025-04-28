import { IngredientsCategory } from '@components'; // Import IngredientsCategory
import { TIngredient, TTabMode } from '@utils-types';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { getIngredientState } from '../../services/slices/ingredients-slice';
// Import and rename the CSS module
import styles from './burger-ingredients.module.css';

export const BurgerIngredients: FC = () => {
  // Logic from the original container (burger-ingredientsUI.tsx)
  const { ingredients, loading, error } = useSelector(getIngredientState); // TODO: Handle loading/error states

  // Use useMemo for optimized filtering
  const buns = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'bun'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'main'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'sauce'),
    [ingredients]
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 }); // Renamed for clarity
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewMains) {
      // Use renamed variable
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewMains, inViewSauces]); // Use renamed variable

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add loading/error handling
  if (loading) {
    return <p>Loading ingredients...</p>; // Or use a Preloader component
  }

  if (error) {
    return <p>Error loading ingredients: {error}</p>;
  }

  // Integrated UI Structure (from ui/burger-ingredientsUI.tsx)
  return (
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
        <div className={styles.content} data-cy='ingredients-list'>
          <IngredientsCategory
            title='Stellar Buns'
            titleRef={titleBunRef}
            ingredients={buns} // Use derived state
            ref={bunsRef} // Use ref directly
          />
          <IngredientsCategory
            title='Cosmic Fillings'
            titleRef={titleMainRef}
            ingredients={mains} // Use derived state
            ref={mainsRef} // Use ref directly
          />
          <IngredientsCategory
            title='Space Sauces'
            titleRef={titleSaucesRef}
            ingredients={sauces} // Use derived state
            ref={saucesRef} // Use ref directly
          />
        </div>
      </section>
    </>
  );
};
