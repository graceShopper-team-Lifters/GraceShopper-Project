import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import BottomNav from '../features/navbar/bottomNav'

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <BottomNav />
    </>
  );
};

export default App;
