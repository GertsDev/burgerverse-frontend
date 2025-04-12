import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        {/* Space Builder */}
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
          }
        >
          <BurgerIcon
            type={window.location.pathname === '/' ? 'primary' : 'secondary'}
          />
          <p className='text text_type_main-default ml-2 mr-10'>
            Space Builder
          </p>
        </NavLink>

        {/* Order Feed */}
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
          }
        >
          <ListIcon
            type={
              window.location.pathname.startsWith('/feed')
                ? 'primary'
                : 'secondary'
            }
          />
          <p className='text text_type_main-default ml-2'>Order Feed</p>
        </NavLink>
      </div>

      {/* Logo */}
      <div className={styles.logo}>
        <NavLink to='/'>
          <div className={styles.logo_container}>
            <span className={styles.logo_text}>BURGER</span>
            <img
              src='/burgerverse_logo.png'
              alt='Burgerverse Logo'
              className={styles.logo_image}
            />
            <span className={styles.logo_text}>VERSE</span>
          </div>
        </NavLink>
      </div>

      {/* Profile */}
      <NavLink
        to='/profile'
        className={({ isActive }) =>
          `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
        }
      >
        <ProfileIcon
          type={
            window.location.pathname === '/profile' ? 'primary' : 'secondary'
          }
        />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Space Profile'}
        </p>
      </NavLink>
    </nav>
  </header>
);
