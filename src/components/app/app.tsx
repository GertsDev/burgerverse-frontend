// src/components/App.tsx

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

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

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  PageWrapper,
  ProtectedRoute
} from '@components';
import { ImagePreloader } from '../image-preloader/image-preloader';

import { getIngredients } from '@slices/ingredients-slice';
import { getUserState } from '@slices/userSlice';
import { checkUserAuth } from '../../services/authActions';
import { useDispatch, useSelector } from '../../services/store';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // We use location.state.background to know if we should render a modal
  const background = (location.state as { background?: Location })?.background;

  // Read auth flags from Redux
  const { isAuthenticated, isAuthChecked } = useSelector(getUserState);

  // 1) Check auth only once on mount (remove isAuthenticated from deps)
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]); // ← changed: only dispatch, no isAuthenticated

  // 2) Fetch ingredients once on mount
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  // 3) Optionally: while we haven't finished the auth check, show a spinner
  if (!isAuthChecked) {
    return <ImagePreloader />; // or your own <Preloader />
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <ImagePreloader />

      {/* The main routes. If background is set, we render these in the “page behind” */}
      <Routes location={background || location}>
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

        {/* Unauthenticated‑only routes */}
        <Route element={<ProtectedRoute onlyAuthorized={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Authenticated‑only routes */}
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

      {/* If background is set, show these routes as modals on top */}
      {background && (
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
      )}
    </div>
  );
};

export default App;
