import logoUrl from '@images/burgerverse_logo.png';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserState } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
// Import and rename the CSS module
import styles from './app-header.module.css';

export const AppHeader: FC = () => {
  // Logic from original container
  const { user } = useSelector(getUserState); // Get the whole user object
  const userName = user?.name; // Safely access name

  // Integrated UI Structure (from AppHeaderUI)
  return (
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
            {(
              { isActive } // Use render prop for better icon state handling
            ) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Space Builder
                </p>
              </>
            )}
          </NavLink>

          {/* Order Feed */}
          <NavLink
            to='/feed'
            end // Add 'end' prop if '/feed/:id' should not activate this link
            className={({ isActive }) =>
              `${styles.link} p-4 ${isActive ? styles.link_active : ''}`
            }
          >
            {(
              { isActive } // Use render prop
            ) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>Order Feed</p>
              </>
            )}
          </NavLink>
        </div>

        {/* Logo */}
        <div className={styles.logo}>
          <NavLink to='/'>
            <div className={styles.logo_container}>
              <span className={styles.logo_text}>BURGER</span>
              <img
                src={logoUrl}
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
          {(
            { isActive } // Use render prop
          ) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Space Profile'} {/* Use userName directly */}
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
