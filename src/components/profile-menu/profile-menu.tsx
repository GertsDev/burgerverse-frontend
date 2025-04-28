import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../services/authActions';
import { useDispatch } from '../../services/store';
// Import CSS module
import styles from './profile-menu.module.css';

export const ProfileMenu: FC = () => {
  // Logic from original container
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Integrated UI Structure (from ProfileMenuUI)
  return (
    <>
      <NavLink
        to={'/profile'}
        className={({ isActive }) =>
          `${styles.link} text text_type_main-medium ${isActive ? styles.link_active : 'text_color_inactive'}`
        }
        end // Ensure exact match
      >
        Profile
      </NavLink>
      <NavLink
        to={'/profile/orders'}
        className={({ isActive }) =>
          `${styles.link} text text_type_main-medium ${isActive ? styles.link_active : 'text_color_inactive'}`
        }
      >
        Order History
      </NavLink>
      <button
        className={`${styles.button} text text_type_main-medium text_color_inactive`}
        onClick={handleLogout} // Use integrated handler
      >
        Logout
      </button>
      <p
        className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}
      >
        In this section you can change your personal data
      </p>
    </>
  );
};
