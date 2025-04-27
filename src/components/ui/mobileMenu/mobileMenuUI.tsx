import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './mobileMenuUI.module.css';

export const MobileMenuUI: FC = () => (
  <nav className={styles.menu}>
    {/* Space Builder */}
    <NavLink
      to='/'
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <BurgerIcon
        type={window.location.pathname === '/' ? 'primary' : 'secondary'}
      />
      <span className={`text text_type_main-default ${styles.link_text}`}>
        Space Builder
      </span>
    </NavLink>

    {/* Order Feed */}
    <NavLink
      to='/feed'
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <ListIcon
        type={
          window.location.pathname.startsWith('/feed') ? 'primary' : 'secondary'
        }
      />
      <span className={`text text_type_main-default ${styles.link_text}`}>
        Order Feed
      </span>
    </NavLink>

    {/* Profile */}
    <NavLink
      to='/profile'
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <ProfileIcon
        type={
          window.location.pathname.startsWith('/profile')
            ? 'primary'
            : 'secondary'
        }
      />
      <span className={`text text_type_main-default ${styles.link_text}`}>
        Profile
      </span>
    </NavLink>
  </nav>
);
