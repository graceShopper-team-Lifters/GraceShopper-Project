import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import CartPage from '../features/cart/CartPage';
import CheckoutPage from '../features/cart/CheckoutPage';
import Attitude from '../components/attitude';
import Discipline from '../components/discipline';
import Charisma from '../components/charisma';
import Patience from '../components/patience';
import Home from '../features/home/Home';
import { me } from './store';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/attitude"
            element={<Attitude />}
          />
          <Route
            path="/charisma"
            element={<Charisma />}
          />
            <Route
            path="/discipline"
            element={<Discipline />}
          />
            <Route
            path="/patience"
            element={<Patience />}
          />
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
