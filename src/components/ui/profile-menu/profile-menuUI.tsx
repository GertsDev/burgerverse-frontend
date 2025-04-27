import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-menuUI.module.css';
import { ProfileMenuUIProps } from './type';

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => (
  <>
    <NavLink
      to={'/profile'}
      className={({ isActive }) =>
        `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
          styles.link
        } ${isActive ? styles.link_active : ''}`
      }
      end
    >
      Profile
    </NavLink>
    <NavLink
      to={'/profile/orders'}
      className={({ isActive }) =>
        `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
          styles.link
        } ${isActive ? styles.link_active : ''}`
      }
    >
      Order History
    </NavLink>
    <button
      className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.button}`}
      onClick={handleLogout}
    >
      Exit Space Station
    </button>
    <p className='pt-20 text text_type_main-default text_color_inactive'>
      {pathname === '/profile'
        ? 'Edit your space commander details in this sector'
        : 'View your cosmic order history in this sector'}
    </p>
  </>
);
