import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  PageWrapper,
  ProtectedRoute
} from '@components';
import { MobileMenu } from '@components/mobileMenu';
import { useIsMobile } from '@hooks/useIsMobile';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { checkUserAuth } from '../../services/authActions';
import { getIngredients } from '../../services/slices/ingredients-slice';
import { getUserState } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { ImagePreloader } from '../image-preloader/image-preloader';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const LocationState = location.state as { background?: Location };
  const { isAuthenticated, isAuthChecked } = useSelector(getUserState);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const isMobile = useIsMobile();

  return (
    <div className={styles.app}>
      <AppHeader />
      <ImagePreloader />
      {isMobile && <MobileMenu />}
      <Routes location={LocationState?.background || location}>
        {/* Public routes */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <PageWrapper paramHandle title='#'>
              <OrderInfo />
            </PageWrapper>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <PageWrapper title='Ingredient details'>
              <IngredientDetails />
            </PageWrapper>
          }
        />
        <Route path='*' element={<NotFound404 />} />

        {/* Protected routes for unauthorized users only */}
        <Route element={<ProtectedRoute onlyAuthorized={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Protected routes for authorized users only */}
        <Route element={<ProtectedRoute onlyAuthorized />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <PageWrapper paramHandle title='#'>
                <OrderInfo />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>

      {/* Modals */}
      {LocationState?.background ? (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='#' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='#' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ingredient details' onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        </>
      ) : null}
    </div>
  );
};

export default App;
