import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
// Import CSS module
import styles from './mobileMenu.module.css';

export const MobileMenu: FC = () => (
  <nav className={styles.menu}>
    {/* Space Builder */}
    <NavLink
      to='/'
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${styles.link_text}`}>
            Space Builder
          </span>
        </>
      )}
    </NavLink>

    {/* Order Feed */}
    <NavLink
      to='/feed'
      end // Add end prop
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <ListIcon type={isActive ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${styles.link_text}`}>
            Order Feed
          </span>
        </>
      )}
    </NavLink>

    {/* Profile */}
    <NavLink
      to='/profile'
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${styles.link_text}`}>
            Profile
          </span>
        </>
      )}
    </NavLink>
  </nav>
);
