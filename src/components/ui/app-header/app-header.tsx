import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        {/* Конструктор */}
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
          }
        >
          <BurgerIcon type='primary' />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>

        {/* Лента заказов */}
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
          }
        >
          <ListIcon type='primary' />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>

      {/* Логотип */}
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo className='' />
        </NavLink>
      </div>

      {/* Профиль */}
      <NavLink
        to='/profile'
        className={({ isActive }) =>
          `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
        }
      >
        <ProfileIcon type='primary' />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </NavLink>
    </nav>
  </header>
);
